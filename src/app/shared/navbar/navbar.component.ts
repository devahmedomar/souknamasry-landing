import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  Renderer2,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { FragmentActiveDirective } from '../directives/fragment-active.directive';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/myTranslate/my-translate.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    FragmentActiveDirective,
    CommonModule,
    RouterModule,
    RouterLinkActive,
    TranslatePipe,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  translateService = inject(TranslateService);
  myTranslateService = inject(MyTranslateService);
  ngxSpinnerService = inject(NgxSpinnerService);

  currentLanguage: string = 'ar';
  isLoading: boolean = true;

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.currentLanguage = this.translateService.currentLang || 'ar';
    this.updateHtmlDirection();
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
      this.updateHtmlDirection();
      this.stopLoading();
    });

    if (this.translateService.currentLang) {
      this.currentLanguage = this.translateService.currentLang;
      this.stopLoading();
    }
  }

  updateHtmlDirection(): void {
    if (isPlatformBrowser(this.platformId)) {
      const dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
      this.renderer.setAttribute(document.documentElement, 'dir', dir);
      this.renderer.setAttribute(
        document.documentElement,
        'lang',
        this.currentLanguage
      );
    }
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
    this.changeLanguage(newLang);
  }

  changeLanguage(lang: string): void {
    this.myTranslateService.changeLanguage(lang);
    this.currentLanguage = lang;
  }

  private stopLoading(): void {
    setTimeout(() => {
      this.ngxSpinnerService.hide();
      this.isLoading = false;
    }, 500);
  }

  toggleNavbar(list: HTMLElement): void {
    list.classList.toggle('d-none');
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.router.url === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      });
    }
  }
  isNavbarCollapsed = true;
  @HostListener('window:scroll')
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector('.my-navbar') as HTMLElement;
      if (!element) return;

      const isSmallScreen = window.innerWidth < 992;
      const isScrolled = window.scrollY > 0;
      const isMenuOpen = !this.isNavbarCollapsed;
      if ((isSmallScreen && isMenuOpen) || (isSmallScreen && isScrolled)) {
        element.style.padding = '5px 0';
        element.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      } else {
        element.style.backgroundColor = 'transparent';
        element.style.padding = '10px 0';
        element.style.boxShadow = 'none';
        element.style.height = '100px';
      }

      element.style.transition = 'all 0.3s ease';
    }
  }
}
