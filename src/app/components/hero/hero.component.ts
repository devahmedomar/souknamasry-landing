import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeroComponent implements AfterViewInit{
  // Injects the PLATFORM_ID token to determine whether the code is running on the browser or server
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  // Reference to the SVG element to manipulate its classes or styles
  @ViewChild('svgElement') svgRef!: ElementRef<SVGElement>;
  ngAfterViewInit(): void {
    // Adding an animation class to the SVG element
    setTimeout(() => {
      if (this.svgRef?.nativeElement) {
        this.svgRef.nativeElement.classList.add('animated');
      }
    }, 1000);
    // Initialize AOS (Animate On Scroll) library only if running in the browser 
    // to prevent issues during server-side rendering
    if (isPlatformBrowser(this.platformId)) {
      import('aos')
        .then(AOS => {
          AOS.init({ duration: 1200, once: true });
        })
        .catch(err => console.error('Failed to load AOS', err));
    }
  }
  
  // State variable to control the visibility of the video popup
  showVideoPopup = false;
    
  // Reference to the video player element to manipulate the video
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  // Function to pause the video and hide the dialog
  pauseVideo() {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    }
    this.showVideoPopup = false;
  }

  // Function to close the dialog when clicking outside of it
  closeDialog(event: MouseEvent) {
    this.pauseVideo();
  }
}
