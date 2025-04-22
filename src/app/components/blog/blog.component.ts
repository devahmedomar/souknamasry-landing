import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CardModule , CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  
  blogs = [
    {
      id: 1,
      title: 'ليه لازم تبدأ تبيع أونلاين؟',
      image: 'assets/images/shop.png',
      excerpt: 'لو عندك محل فعلي وبتبيع فيه كويس، فده ممتاز! بس تفتكر كام واحد من برّا منطقتك يعرفك؟ البيع أونلاين مش بس بيوسع دايرة عملاءك، ده كمان بيساعدك تزود أرباحك وتبني اسم أقوى...'
    },
    
    {
      id: 2,
      title: 'تحسين عرض المنتجات لزيادة المبيعات',
      image: 'assets/images/product2.jpg',
      excerpt: ' في عالم التجارة الإلكترونية، طريقة عرض المنتج بتفرق كتير في قرار الشراء. أصحاب المحلات اللي بيستخدموا  المنصات الرقمية محتاجين يهتموا جدًا ...'
    },
    {
      id: 3,
      title: 'طرق توصيل المنتجات بأمان وكفاءة ',
      image: 'assets/images/product3.jpg',
      excerpt:'التوصيل هو جزء أساسي من تجربة الشراء أونلاين. وأي تأخير أو ضرر في المنتج أثناء التوصيل ممكن يؤثر بشكل سلبي على سمعة المحل. عشان كده، اختيار الطريقة ...'
    }
  ];

}
