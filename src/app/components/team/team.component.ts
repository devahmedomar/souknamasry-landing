import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  AfterViewInit,
  inject,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    TagModule,
    CarouselModule,
    TranslatePipe,
  ],
  host: { ngSkipHydration: 'true' },
})
export class TeamComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser = false;
  direction: 'ltr' | 'rtl' = 'ltr';

  private readonly translateService = inject(TranslateService);
  private langChangeSubscription: Subscription | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  teamMembers = [
    { image: '/assets/images/ahmed.jpg', key: 'ahmed' },
    { image: '/assets/images/reham.jpg', key: 'reham' },
    { image: '/assets/images/shahd.jpg', key: 'shahd' },
    { image: '/assets/images/hassan.jpg', key: 'hassan' },
    { image: '/assets/images/amina.jpg', key: 'amina' },
    { image: '/assets/images/mariam.jpg', key: 'mariam' },
    { image: '/assets/images/nor.jpg', key: 'noran' },
    { image: '/assets/images/team3.png', key: 'marvin' },
    { image: '/assets/images/team3.png', key: 'darlene' },
  ];

  responsiveOptions = [
    {
      breakpoint: '992px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '320px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    // Set direction based on current language
    this.updateDirection();

    // Subscribe to language changes
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      () => {
        this.updateDirection();
      }
    );

    if (this.isBrowser) {
      import('aos').then((AOS) => {
        AOS.init();
        AOS.refresh();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        const cards = document.querySelectorAll('.team-card');
        import('vanilla-tilt').then((VanillaTilt) => {
          VanillaTilt.default.init(cards as any);
        });
      }, 100);
    }
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private updateDirection(): void {
    const lang =
      this.translateService.currentLang ||
      this.translateService.getDefaultLang();
    this.direction = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
