import {  Component,AfterViewInit, OnInit, inject, DestroyRef, Inject, PLATFORM_ID, signal,} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import AOS from 'aos';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit, AfterViewInit {
    // Inject platform ID to check if running in the browser
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Inject TranslateService and DestroyRef using signal-based approach
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  // Signals to hold translated title and service cards
  title1 = signal<string>('');
  services = signal<{ title: string; description: string; image: string }[]>([]);

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    );

// List of static image paths for the service cards
    const images = [
      'assets/images/ser1.jpg',
      'assets/images/ser2.avif',
      'assets/images/ser3.avif',
      'assets/images/ser4.avif',
      'assets/images/ser5.jpg',
      'assets/images/ser6.jpg',
    ];
   //fetch translations and update signals
    const updateServices = () => {
      this.translate.get(['services2.title1', 'services2.cards']).subscribe((translations) => {

           // Set the translated title
        this.title1.set(translations['services2.title1']);

         // Set the translated cards with images
        const rawCards = translations['services2.cards'];
        const cards = Array.isArray(rawCards) ? rawCards : [];

        this.services.set(
          cards.map((card, index) => ({
            title: card.title,
            description: card.description,
            image: images[index],
          }))
        );
      });
    };

    updateServices();
       // Update translations on language change
    lang$.subscribe(updateServices);
  }

  ngAfterViewInit(): void {
    // Initialize AOS animations on the browser only
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        AOS.init({ once: false });
      });
    }
  }
}
