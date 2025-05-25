import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { BlogComponent } from '../blog/blog.component';
import { TeamComponent } from '../team/team.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser, NgIf, NgSwitchDefault } from '@angular/common';
import { filter } from 'rxjs';
import { NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

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
export class HomeComponent implements OnInit {
  isBrowser: boolean;

  currentFragment: string | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.ngxSpinnerService.show();

      const initialFragment = this.activateRoute.snapshot.fragment;
      if (initialFragment) {
        this.currentFragment = initialFragment;
        setTimeout(() => this.scrollToFragment(), 0);
      } else {
        // لو مفيش fragment، نخفي الـ spinner ونظهر المحتوى بعد التأخير
        setTimeout(() => {
          this.ngxSpinnerService.hide();

        }, 1000);
      }

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const newFragment = this.activateRoute.snapshot.fragment;
          if (newFragment) {
            this.currentFragment = newFragment;
            setTimeout(() => this.scrollToFragment(), 0);
          }
        });
    }
  }

  private scrollToFragment(): void {
    this.ngxSpinnerService.show();

    if (this.currentFragment) {
      setTimeout(() => {
        const element = document.getElementById(this.currentFragment!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        this.ngxSpinnerService.hide();
        
      }, 800);
    } else {
      this.ngxSpinnerService.hide();

    }
  }
}

