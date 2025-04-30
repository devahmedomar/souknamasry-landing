import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import AOS from 'aos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})

export class ServicesComponent implements AfterViewInit {
  // Injects the PLATFORM_ID token to determine whether the code is running on the browser or server
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        once: false
      });
    }
  }
  services = [
    {
      title: 'A Personalized Shop Page',
      description: 'Create your own beautiful page and showcase your products professionally.',
      image: 'assets/images/ser1.jpg'
    },
    {
      title: 'Smart Dashboard',
      description: 'Track your sales, page visits, and insights that help you grow your business.',
      image: 'assets/images/ser2.avif'
    },
    {
      title: 'Marketing Support',
      description: 'We help promote your approved products through targeted campaigns.',
      image: 'assets/images/ser3.avif'
    },
    {
      title: 'Seamless Buying Experience',
      description: 'Make it easy for customers to find and purchase your products without hassle.',
      image: 'assets/images/ser4.avif'
    },
    {
      title: 'Visitor & Customer Insights',
      description: 'See who’s visiting your page and which products get the most attention.',
      image: 'assets/images/ser5.jpg'
    },
    {
      title: 'Ongoing Support',
      description: 'We\'re always here for you — with technical help and friendly customer service whenever you need it.',
      image: 'assets/images/ser6.jpg'
    }
  ];

}