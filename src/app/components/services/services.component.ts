import { Component, AfterViewInit, OnInit, inject, DestroyRef, Inject, PLATFORM_ID, signal,} from '@angular/core';
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
export class ServicesComponent implements AfterViewInit, OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Inject services
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  // Signal to store translated services
  services = signal<{ title: string; description: string; image: string }[]>([]);

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef));

    const updateServices = () => {
      this.translate
        .get([
          'servicesSection.cards.0.title',
          'servicesSection.cards.0.description',
          'servicesSection.cards.1.title',
          'servicesSection.cards.1.description',
          'servicesSection.cards.2.title',
          'servicesSection.cards.2.description',
          'servicesSection.cards.3.title',
          'servicesSection.cards.3.description',
          'servicesSection.cards.4.title',
          'servicesSection.cards.4.description',
          'servicesSection.cards.5.title',
          'servicesSection.cards.5.description',
        ])
        .subscribe((translations) => {
          this.services.set([
            {
              title: translations['servicesSection.cards.0.title'],
              description: translations['servicesSection.cards.0.description'],
              image: 'assets/images/ser1.jpg',
            },
            {
              title: translations['servicesSection.cards.1.title'],
              description: translations['servicesSection.cards.1.description'],
              image: 'assets/images/ser2.avif',
            },
            {
              title: translations['servicesSection.cards.2.title'],
              description: translations['servicesSection.cards.2.description'],
              image: 'assets/images/ser3.avif',
            },
            {
              title: translations['servicesSection.cards.3.title'],
              description: translations['servicesSection.cards.3.description'],
              image: 'assets/images/ser4.avif',
            },
            {
              title: translations['servicesSection.cards.4.title'],
              description: translations['servicesSection.cards.4.description'],
              image: 'assets/images/ser5.jpg',
            },
            {
              title: translations['servicesSection.cards.5.title'],
              description: translations['servicesSection.cards.5.description'],
              image: 'assets/images/ser6.jpg',
            },
          ]);
        });
    };

    updateServices();       // Initial load
    lang$.subscribe(updateServices);  // Update on language change
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        AOS.init({ once: false });
      });
    }
  }
}
