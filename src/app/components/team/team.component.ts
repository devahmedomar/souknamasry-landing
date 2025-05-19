import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CarouselModule],
  host: { ngSkipHydration: 'true' },
})
export class TeamComponent implements OnInit, AfterViewInit {
  isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  teamMembers = [
    {
      image: '/assets/images/ahmed.jpg',
      role: 'Front End Developer',
      name: 'Ahmed Muhammad',
    },
    {
      image: '/assets/images/reham.jpg',
      role: 'Front End Developer',
      name: 'Reham Reda',
    },
    {
      image: '/assets/images/shahd.jpg',
      role: 'Front End Developer',
      name: 'Shahd Salama',
    },
    {
      image: '/assets/images/hassan.jpg',
      role: 'Software Tester',
      name: 'Hassan Elsakka',
    },
    {
      image: '/assets/images/amina.jpg',
      role: 'Data Analyst',
      name: 'Amina Younis'
    },
    {
      image: '/assets/images/mariam.jpg',
      role: 'UI/UX Designer',
      name: 'Mariam Bakr',
    },
    {
      image: '/assets/images/nor.jpg',
      role: 'UI/UX Designer',
      name: 'Noran Morsy',
    },
    {
      image:'/assets/images/team3.png',
      role: 'Back End Developer',
      name: 'Marvin McKinney',
    },
    {
      image: '/assets/images/team3.png',
      role: 'Back End Developer',
      name: 'Darlene Robertson',
    },

  ];

  responsiveOptions: any[] = [];

  ngOnInit(): void {
    if (this.isBrowser) {
      import('aos').then((AOS) => {
        AOS.init();
        AOS.refresh();
      });
    }
    this.responsiveOptions = [
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
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const cards = document.querySelectorAll('.team-card');
        import('vanilla-tilt').then((VanillaTilt) => {
          VanillaTilt.default.init(cards as any);
        });
      }, 100);
    }
  }
}
