import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { BlogComponent } from '../blog/blog.component';
import { TeamComponent } from '../team/team.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,AboutComponent,ServicesComponent,TeamComponent,BlogComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });

    // Listen to navigation end in case fragment doesn't update
    this.router.events.subscribe(event => {
      // You can add NavigationEnd check if needed
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });
  }

  scrollToFragment(fragment: string) {
    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (element) {
        const yOffset = -56; // Adjust based on fixed navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 0);
  }

}
