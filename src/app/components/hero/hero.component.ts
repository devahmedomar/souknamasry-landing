import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  
})
export class HeroComponent {
  @ViewChild('svgElement') svgRef!: ElementRef<SVGElement>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.svgRef) {
        this.svgRef.nativeElement.classList.add('animated');
      }
    }, 1000);
  }
  
}
