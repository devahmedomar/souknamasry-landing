import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
 import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
 import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardModule , CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  // Injects the PLATFORM_ID token to determine whether the code is running on the browser or server
  constructor(@Inject(PLATFORM_ID) private platformId: Object , private router: Router) {}

ngAfterViewInit(): void {
    // Initialize AOS (Animate On Scroll) library only if running in the browser 
    // to prevent issues during server-side rendering
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1200,
        once: false
      });
    }
  }

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