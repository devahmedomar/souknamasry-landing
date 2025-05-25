import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  standalone: true,
  imports: [CarouselModule, TranslatePipe],
  host: { ngSkipHydration: 'true' },
})
export class TeamComponent implements OnInit, AfterViewInit, OnDestroy {
  isBrowser = false;
  direction: 'ltr' | 'rtl' = 'ltr';

   readonly translateService = inject(TranslateService);
  private langChangeSubscription: Subscription | null = null;

  @ViewChild('carousel', { static: false }) carousel!: Carousel;

  teamMembers = [
    { image: '/assets/images/ahmedomar.jpg', key: 'ahmedomar' },
    { image: '/assets/images/ahmed.jpg', key: 'ahmed' },
    { image: '/assets/images/reham.jpg', key: 'reham' },
    { image: '/assets/images/shahd.jpg', key: 'shahd' },
    { image: '/assets/images/hassan.jpg', key: 'hassan' },
    { image: '/assets/images/amina.jpg', key: 'amina' },
    { image: '/assets/images/mariam.jpg', key: 'mariam' },
    { image: '/assets/images/norann.jpg', key: 'noran' },
    { image: '/assets/images/mai.jpg', key: 'mai' },
    { image: '/assets/images/rehab.jpg', key: 'rehab' },
    { image: '/assets/images/EsraaMohamedYousefporposal.jpg', key: 'esraa' },
    { image: '/assets/images/hager.jpg', key: 'hager' },
    { image: '/assets/images/sherifmohsen.jpg', key: 'sherif' },
  ];

  responsiveOptions = [
    { breakpoint: '1199px', numVisible: 3, numScroll: 3 },
    { breakpoint: '992px', numVisible: 3, numScroll: 3 },
    { breakpoint: '768px', numVisible: 2, numScroll: 2 },
    { breakpoint: '425px', numVisible: 1, numScroll: 1 },
    { breakpoint: '375px', numVisible: 1, numScroll: 1 },
    { breakpoint: '320px', numVisible: 1, numScroll: 1 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {


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



  private reinitializeAOSandTilt(): void {
    if (!this.isBrowser) return;

    setTimeout(() => {
      const cards = document.querySelectorAll('.team-card');
      import('aos').then((AOS) => AOS.refresh());

      import('vanilla-tilt').then((VanillaTilt) => {
        cards.forEach((card) => {
          if ((card as any).vanillaTilt) {
            (card as any).vanillaTilt.destroy();
          }
        });
        VanillaTilt.default.init(cards as any);
      });
    }, 2000);
  }
}
