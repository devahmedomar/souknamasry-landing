import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import AOS from 'aos';
import { signal, inject, effect, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardModule, CommonModule, TranslateModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  // Inject services
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  // Reactive signals
  heading = signal<string>('');
  readMoreText = signal<string>('');
  cards = signal<any[]>([]);

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef));

    const updateContent = () => {
      this.translate.get([
        'blogsSection.Heading',
        'blogsSection.ReadMore',
        'blogsSection.cards.0.title',
        'blogsSection.cards.0.description',
        'blogsSection.cards.1.title',
        'blogsSection.cards.1.description',
        'blogsSection.cards.2.title',
        'blogsSection.cards.2.description',
      ]).subscribe(translations => {
        this.heading.set(translations['blogsSection.Heading']);
        this.readMoreText.set(translations['blogsSection.ReadMore']);
        this.cards.set([
          {
            id: '1',
            image: 'assets/images/card1.png',
            icon: 'pi pi-shopping-cart',
            title: translations['blogsSection.cards.0.title'],
            description: translations['blogsSection.cards.0.description']
          },
          {
            id: '2',
            image: 'assets/images/card2.png',
            icon: 'pi pi-shopping-bag',
            title: translations['blogsSection.cards.1.title'],
            description: translations['blogsSection.cards.1.description']
          },
          {
            id: '3',
            image: 'assets/images/card3.png',
            icon: 'pi pi-chart-line',
            title: translations['blogsSection.cards.2.title'],
            description: translations['blogsSection.cards.2.description']
          }
        ]);
      });
    };

    updateContent();
    lang$.subscribe(updateContent);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1200,
        once: false
      });
    }
  }

  navigate(id: string | number) {
    this.router.navigate(['/blog-details', id]);
  }
}
