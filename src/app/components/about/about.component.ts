import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  ngOnInit(): void {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
      once: false
    });
  }

}
