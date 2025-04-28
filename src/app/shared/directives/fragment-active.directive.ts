import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appFragmentActive]',
  standalone: true,
})
export class FragmentActiveDirective implements OnInit, OnDestroy {
  @Input('appFragmentActive') fragment!: string;
  @Input() activeClass = 'actives';

  private sub!: Subscription;

  constructor(
    private el: ElementRef,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentFragment = this.router.url.split('#')[1];

        const isRootAndNoFragment =
          this.router.url === '/' && this.fragment === 'hero';

        const isActive =
          currentFragment === this.fragment || isRootAndNoFragment;

        if (isActive) {
          this.renderer.addClass(this.el.nativeElement, this.activeClass);

          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              const element = document.getElementById(this.fragment);
              if (element) {
                const scrollToY =
                  element.getBoundingClientRect().top +
                  window.pageYOffset -
                  140;
                window.scrollTo({ top: scrollToY, behavior: 'smooth' });
              }
            }, 50);
          }
        } else {
          this.renderer.removeClass(this.el.nativeElement, this.activeClass);
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
