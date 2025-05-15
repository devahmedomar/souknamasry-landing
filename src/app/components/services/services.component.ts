import {
  Component,
  AfterViewInit,
  OnInit,
  inject,
  DestroyRef,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
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

  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  title1 = signal<string>('');
  services = signal<{ title: string; description: string; image: string }[]>([]);

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    );

    const images = [
      'assets/images/ser1.jpg',
      'assets/images/ser2.avif',
      'assets/images/ser3.avif',
      'assets/images/ser4.avif',
      'assets/images/ser5.jpg',
      'assets/images/ser6.jpg',
    ];

    const updateServices = () => {
      this.translate.get(['services2.title1', 'services2.cards']).subscribe((translations) => {
        this.title1.set(translations['services2.title1']);
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
    lang$.subscribe(updateServices);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        AOS.init({ once: false });
      });
    }
  }
}
