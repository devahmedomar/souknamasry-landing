import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { BlogComponent } from '../blog/blog.component';
import { TeamComponent } from '../team/team.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    BlogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // enhanced sol
  isBrowser: boolean;
  currentFragment: string | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const fragment = this.activateRoute.snapshot.fragment;
          if (fragment) {
            this.currentFragment = fragment;
            // Wait for DOM to render before scrolling
            setTimeout(() => this.scrollToFragment(), 0);
          }
        });
    }
  }

  private scrollToFragment() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.currentFragment) {
        const element = document.getElementById(this.currentFragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }
}
