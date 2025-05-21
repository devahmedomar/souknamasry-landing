import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, inject, DestroyRef, signal} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // signals
  title = signal('');
  title2 = signal('');
  description = signal('');
  strongtext = signal('');
  atText = signal('');
  subdescription = signal('');
  highlightedLine = signal('');
  features_title = signal('');
  features = signal<{ icon: string; title: string; description: string }[]>([]);

  aboutimg = 'assets/images/about.png';

  ngOnInit(): void {
    const lang$ = this.translate.onLangChange.pipe(
      takeUntilDestroyed(this.destroyRef)
    );

    const updateTranslations = () => {
      this.translate
        .get([
          'about.title',
          'about.title2',
          'about.description',
          'about.strongText',
          'about.atText',
          'about.subdescription',
          'about.highlightedLine',
          'about.featuresTitle',
          'about.features'
        ])
        .subscribe(translations => {
          this.title.set(translations['about.title']);
          this.title2.set(translations['about.title2']);
          this.description.set(translations['about.description']);
          this.strongtext.set(translations['about.strongText']);
          this.atText.set(translations['about.atText']);
          this.subdescription.set(translations['about.subdescription']);
          this.highlightedLine.set(translations['about.highlightedLine']);
          this.features_title.set(translations['about.featuresTitle']);

          const rawFeatures = translations['about.features'];
          const featuresArray = Array.isArray(rawFeatures) ? rawFeatures : [];
          this.features.set(featuresArray);
        });
    };

    updateTranslations();
    lang$.subscribe(updateTranslations);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => AOS.init());
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
