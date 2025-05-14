import {Component,AfterViewInit,OnInit,inject,DestroyRef,Inject,PLATFORM_ID,signal,} from '@angular/core';
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
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Inject TranslateService to access translations
  private translate = inject(TranslateService);

  // Inject DestroyRef to automatically clean up subscriptions on component destroy
  private destroyRef = inject(DestroyRef);

  title1 = signal<string>('');

  services = signal<{ title: string; description: string; image: string }[]>([]);

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    );

    // images paths corresponding to the service cards
    const images = [
      'assets/images/ser1.jpg',
      'assets/images/ser2.avif',
      'assets/images/ser3.avif',
      'assets/images/ser4.avif',
      'assets/images/ser5.jpg',
      'assets/images/ser6.jpg',
    ];

    //  fetch translations and update the reactive signals
    const updateServices = () => {
      this.translate.get(['services.title1', 'services.cards']).subscribe((translations) => {
        this.title1.set(translations['services.title1']);
        const cards = translations['services.cards'] as { title: string; description: string }[];

        // Combine each card with its corresponding image and update the reactive signal
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
    // Reload content when the language changes
    lang$.subscribe(updateServices);
  }

  ngAfterViewInit(): void {
    // Initialize AOS animation only when running in the browser (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        AOS.init({ once: false });
      });
    }
  }
}
