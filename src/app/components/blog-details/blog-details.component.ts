import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { blogsData } from './blog-data';
import AOS from 'aos';
import { NotfoundComponent } from "../../shared/notfound/notfound.component";

export interface Blog {
  id: number;
  title: string;
  image: string;
  content: BlogContentBlock[];
}

export type BlogContentBlock =
  | {
      type: 'paragraph';
      html: string;
    }
  | {
      type: 'list';
      listType: 'ul' | 'ol';
      items: { html: string }[];
};
@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, NotfoundComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements AfterViewInit, OnInit {
  blog: Blog |undefined; // Holds the blog data to be rendered

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
    // Extract the blog ID from the route parameters
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    
    // Find and assign the blog by ID if the ID is valid
    if (id !== null) {
      this.blog = blogsData.find(b => b.id === id);
    }
  }
  
  //Cleanup or refresh when component is destroyed
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh();
    }
  }
  
}
