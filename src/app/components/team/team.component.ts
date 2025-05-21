import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule, Carousel } from 'primeng/carousel';
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
  showCarousel = true;

  private readonly translateService = inject(TranslateService);
  private readonly cdr = inject(ChangeDetectorRef);
  private langChangeSubscription: Subscription | null = null;

  @ViewChild('carousel', { static: false }) carousel!: Carousel;

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
    { breakpoint: '992px', numVisible: 3, numScroll: 3 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '320px', numVisible: 1, numScroll: 1 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.updateDirection();

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      () => {
        this.updateDirection();
        this.reloadCarousel();
      }
    );

    if (this.isBrowser) {
      import('aos').then((AOS) => {
        AOS.init();
      });
    }
  }

  ngAfterViewInit(): void {
    this.reinitializeAOSandTilt();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
  }

  private updateDirection(): void {
    const lang =
      this.translateService.currentLang ||
      this.translateService.getDefaultLang();
    this.direction = lang === 'ar' ? 'rtl' : 'ltr';
    this.cdr.detectChanges();
  }

  private reloadCarousel(): void {
    this.showCarousel = false;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.showCarousel = true;
      this.cdr.detectChanges();
      this.reinitializeAOSandTilt();
    }, 200); // مدة أطول لضمان استقرار العرض
  }

  private reinitializeAOSandTilt(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      const cards = document.querySelectorAll('.team-card');

      import('aos').then((AOS) => AOS.refreshHard());

      import('vanilla-tilt').then((VanillaTilt) => {
        cards.forEach((card) => {
          if ((card as any).vanillaTilt) {
            (card as any).vanillaTilt.destroy();
          }
        });
        VanillaTilt.default.init(cards as any, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
        });
      });
    }, 500); // تأخير لتأكد من عرض الكروت بالكامل
  }
}
