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
        if (currentFragment === this.fragment) {
          this.renderer.addClass(this.el.nativeElement, this.activeClass);
        } else {
          this.renderer.removeClass(this.el.nativeElement, this.activeClass);
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
