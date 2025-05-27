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
    { image: '/assets/images/ahmedomar.jpg', key: 'ahmedomar',linkedin:'https://www.linkedin.com/in/a7medtechnology/',email:"dev.a7med.omar@gmail.com" },
    { image: '/assets/images/ahmed.jpg', key: 'ahmed',linkedin:'https://www.linkedin.com/in/ahmed-muhammad-829752182/',email:"am9564531@gmail.com"  },
    { image: '/assets/images/reham.jpg', key: 'reham',linkedin:'https://www.linkedin.com/in/rehamreda20/',email:"reham.reda.tantawy@gmail.com"  },
    { image: '/assets/images/shahd.jpg', key: 'shahd',linkedin:'https://linkedin.com/in/shahd-othman-58541333b',email:"shahd.web.creator@gmail.com"  },
    { image: '/assets/images/hassan.jpg', key: 'hassan',linkedin:'www.linkedin.com/in/hassan-elsakka-899650238',email:"hassanmelsakka@gmail.com"  },
    { image: '/assets/images/amina.jpg', key: 'amina',linkedin:'https://www.linkedin.com/in/amina-younis-721926254/',email:"aminayounes2002@gmail.com"  },
    { image: '/assets/images/mariam.jpg', key: 'mariam',linkedin:'https://www.linkedin.com/in/mariam-bakr-b60112228',email:"mariambakr296@gmail.com "  },
    { image: '/assets/images/norann.jpg', key: 'noran',linkedin:'https://www.linkedin.com/in/noranmorsy22',email:"normorsy62659@gmail.com"  },
    { image: '/assets/images/mai.jpg', key: 'mai',linkedin:'https://www.linkedin.com/in/may-elsaid/',email:"mayelsaid89@gmail.com"  },
    { image: '/assets/images/rehab.jpg', key: 'rehab',linkedin:'',email:""  },
    { image: '/assets/images/EsraaMohamedYousefporposal.jpg', key: 'esraa',linkedin:'',email:""  },
    { image: '/assets/images/hager.jpg', key: 'hager',linkedin:'https://www.linkedin.com/in/hagar-barakat-479503326/',email:"hagarbarakat305@gmail.com"  },
    { image: '/assets/images/sherifmohsen.jpg', key: 'sherif',linkedin:'https://www.linkedin.com/in/sherif-mohsen29/',email:"sherif99.m8@gmail.com"  },
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
