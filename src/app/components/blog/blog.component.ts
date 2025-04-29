import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardModule , CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  
  constructor(private router: Router) {}

navigate() {
  this.router.navigate(['/blog-details']);
}

Heading='Your Guide to Success in Sales and Markting';
cards = [
  {
    image: 'assets/images/card1.png',
    icon: 'pi pi-shopping-cart',
    title: 'Why E-commerce is the Future for Small Businesses in Egypt',
    description: 'In today’s fast-paced world, online presence is no longer a luxury — it’s a must...'
  },
  {
    image: 'assets/images/card2.png',
    icon: 'pi pi-shopping-bag',
    title: '5 Reasons to Shop Local Online and Support Egyptian Brands',
    description: 'Online shopping doesn’t have to mean buying from huge international brands...'
  },
  {
    image: 'assets/images/card3.png',
    icon: 'pi pi-chart-line',
    title: 'How Soukna Masry Helps Egyptian Shops Sell Smarter — Not Harder',
    description: 'Running a small shop is hard work. You have to manage inventory, customers...'
  }
];


}
