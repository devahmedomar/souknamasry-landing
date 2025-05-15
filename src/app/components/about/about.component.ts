import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  title = 'Why Soukna Masry';
  description = ` is a digital platform made for small and medium-sized shops across Egypt...`;
  aboutimg = `assets/images/about.png`;
  highlightedLine = `one product, one story, one dream at a time.`;
  features_title = `Features that make your experience smarter and easier`;
  features = [
    { icon: 'pi-chart-line', title: 'Easy and Simple Dashboard', description: 'Track your sales...' },
    { icon: 'pi-globe', title: 'Free Marketing for Your Products', description: 'We help your products...' },
    { icon: 'pi-shopping-cart', title: 'Seamless Shopping Experience', description: 'A smart design...' }
  ];
}
