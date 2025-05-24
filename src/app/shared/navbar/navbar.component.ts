import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  inject,
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

  @Output() languageChange = new EventEmitter<string>();
  translateService = inject(TranslateService);
  myTranslateService = inject(MyTranslateService);

  currentLanguage: string = 'ar';
  isLoading: boolean = true;
  isNavbarOpen: boolean = false; // إضافة متغير لتتبع حالة الـ navbar

  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang || 'ar';

    // تعيين الاتجاه قبل عرض أي محتوى
    this.updateHtmlDirection();

    // السماح بعرض الـ navbar بعد التأكد من تعيين الاتجاه
    setTimeout(() => {
      this.isLoading = false;
    }, 0);

    // تحديث الاتجاه عند تغيير اللغة لاحقًا
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
      this.updateHtmlDirection();
    });
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
    this.languageChange.emit(lang);
  }

  // الحل الصحيح للـ navbar toggle
  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen; // بيغير الحالة
    const navbar = document.getElementById('navbarSupportedContent');

    if (navbar) {
      if (this.isNavbarOpen) {
        // لو مقفولة هيفتحها
        this.renderer.removeClass(navbar, 'd-none');
        this.renderer.addClass(navbar, 'd-block');
      } else {
        // لو مفتوحة هيقفلها
        this.renderer.addClass(navbar, 'd-none');
        this.renderer.removeClass(navbar, 'd-block');
      }
    }
  }

  // إغلاق الـ navbar عند الضغط على أي link
  closeNavbar(): void {
    this.isNavbarOpen = false;
    const navbar = document.getElementById('navbarSupportedContent');

    if (navbar) {
      this.renderer.addClass(navbar, 'd-none');
      this.renderer.removeClass(navbar, 'd-block');
    }
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
}
