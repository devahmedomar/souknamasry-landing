import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { blogsData } from './blog-data';
import AOS from 'aos';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [BreadcrumbComponent,CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
  blog: any;
  constructor(private route: ActivatedRoute,@Inject(PLATFORM_ID) private platformId: Object) {}
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
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.blog = blogsData.find(b => b.id === id);
  }

  
}
