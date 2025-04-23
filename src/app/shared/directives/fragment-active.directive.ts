import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

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
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentFragment = this.router.url.split('#')[1];

        // Handle initial empty fragment (e.g. just '/')
        const isRootAndNoFragment = this.router.url === '/' && this.fragment === 'hero';

        const isActive = currentFragment === this.fragment || isRootAndNoFragment;

        if (isActive) {
          this.renderer.addClass(this.el.nativeElement, this.activeClass);

          setTimeout(() => {
            const element = document.getElementById(this.fragment);
            if (element) {
              const scrollToY =
                element.getBoundingClientRect().top +
                window.pageYOffset -
                140; // Adjust for fixed navbar
              window.scrollTo({ top: scrollToY, behavior: 'smooth' });
            }
          }, 50);
        } else {
          this.renderer.removeClass(this.el.nativeElement, this.activeClass);
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
