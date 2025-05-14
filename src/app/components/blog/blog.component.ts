import {Component,AfterViewInit,OnInit,Inject,PLATFORM_ID,signal,inject,DestroyRef,} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import AOS from 'aos';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardModule, CommonModule, TranslateModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
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
    const lang$ = this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    );

    const updateContent = () => {
      this.translate
        .get(['blogs.Heading', 'blogs.ReadMore', 'blogs.cards'])
        .subscribe((translations) => {
          this.heading.set(translations['blogs.Heading']);
          this.readMoreText.set(translations['blogs.ReadMore']);

          const cardTranslations = translations['blogs.cards'] as {
            title: string;
            description: string;
          }[];

          // Static assets: images and icons
          const images = [
            'assets/images/card1.png',
            'assets/images/card2.png',
            'assets/images/card3.png',
          ];
          const icons = [
            'pi pi-shopping-cart',
            'pi pi-shopping-bag',
            'pi pi-chart-line',
          ];

          // Build cards dynamically
          const cardsData = cardTranslations.map((card, index) => ({
            id: (index + 1).toString(),
            title: card.title,
            description: card.description,
            image: images[index],
            icon: icons[index],
          }));

          this.cards.set(cardsData);
        });
    };

    updateContent(); // Initial load
    lang$.subscribe(updateContent); // Update on language change
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1200,
        once: false,
      });
    }
  }

  navigate(id: string | number): void {
    this.router.navigate(['/blog-details', id]);
  }
}
