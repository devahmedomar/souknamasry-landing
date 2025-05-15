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

  // Inject TranslateService and DestroyRef
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  // Reactive signals
  heading = signal<string>(''); 
  // text for "Read More" button
  readMoreText = signal<string>(''); 
  cards = signal<
    { id: string; title: string; description: string; image: string; icon: string }[]
  >([]);

  ngOnInit(): void {
    // Listen to language changes
    const lang$ = this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    );

    // Define static image/icon lists
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

    //  fetch translation and update signals
    const updateContent = () => {
      this.translate
        .get(['blogs.Heading', 'blogs.ReadMore', 'blogs.cards'])
        .subscribe((translations) => {
          this.heading.set(translations['blogs.Heading']);
          this.readMoreText.set(translations['blogs.ReadMore']);

          const rawCards = translations['blogs.cards'];
          const cardsArray = Array.isArray(rawCards) ? rawCards : [];

          this.cards.set(
            cardsArray.map((card, index) => ({
              id: (index + 1).toString(),
              title: card.title,
              description: card.description,
              image: images[index],
              icon: icons[index],
            }))
          );
        });
    };

    updateContent(); 
    lang$.subscribe(updateContent); // Update on language change
  }

  ngAfterViewInit(): void {
    // Initialize AOS animations only in browser
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1200,
        once: false,
      });
    }
  }

  // Navigate to blog details
  navigate(id: string | number): void {
    this.router.navigate(['/blog-details', id]);
  }
}
