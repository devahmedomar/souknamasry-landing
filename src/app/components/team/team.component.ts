import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CarouselModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  host: { ngSkipHydration: 'true' },
})
export class TeamComponent implements OnInit {
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
    {
      image: '/assets/team3.png',
      role: 'CEO',
      name: 'Jacob Jones',
    },
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
  circular: boolean = false;
  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '992px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '576px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
