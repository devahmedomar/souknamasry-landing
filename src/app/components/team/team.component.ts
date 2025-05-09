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
      image: '/assets/team3.png',
      role: 'Programmer',
      name: 'Leslie Alexander',
    },
    {
      image: '/assets/team3.png',
      role: 'UI/UX designer',
      name: 'Courtney Henry',
    },
    {
      image: '/assets/team3.png',
      role: 'Web developer',
      name: 'Marvin McKinney',
    },
    { image: '/assets/team3.png', role: 'CEO', name: 'Jacob Jones' },
    {
      image: '/assets/team3.png',
      role: 'Back End developer',
      name: 'Jacob Jack',
    },
    {
      image: '/assets/team3.png',
      role: 'Software Engineer',
      name: 'Jacob Jon',
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
