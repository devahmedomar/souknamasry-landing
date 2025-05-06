import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  ngOnInit() {
    AOS.init();
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
  
  title = 'Why Soukna Masry';
  description = ` is a digital platform made for small and medium-sized shops across Egypt. We’re here to support every local brand with big dreams but limited resources.
We give shop owners a personalized store page, an easy-to-use dashboard to track sales and visits, and the support they need to grow — from product promotion to real insights And for shoppers, we offer a smart, simple way to discover and buy authentic Egyptian products while supporting passionate local entrepreneurs.`;
  aboutimg = `assets/images/about.png`;
  subDescription = ` , we bring people together,`;
  highlightedLine = `one product, one story, one dream at a time.`;
  features_title = `Features that make your experience smarter and easier`;
  features = [
    { icon: 'pi-chart-line', title: 'Easy and Simple Dashboard', description: 'Track your sales, page visits, and all important details in one place.' },
    { icon: 'pi-globe', title: 'Free Marketing for Your Products', description: 'We help your products reach a larger number of potential customers.' },
    { icon: 'pi-shopping-cart', title: 'Seamless Shopping Experience', description: 'A smart design that helps customers easily find and buy the product they need.' }
  ];
}
