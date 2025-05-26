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
  isNavbarOpen: boolean = false; // Tracks whether the navbar is open or closed

  /**
   * Initializes the component and sets the initial language direction.
   */
  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang || 'ar';

    // Set the HTML direction and language attribute before rendering
    this.updateHtmlDirection();

    // Allow navbar to display after direction is set
    setTimeout(() => {
      this.isLoading = false;
    }, 0);

    // Listen to language change and update direction accordingly
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
      this.updateHtmlDirection();
    });
  }

  /**
   * Updates the <html> element's direction and language attributes based on the current language.
   */
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

  /**
   * Toggles between Arabic and English languages.
   */
  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
    this.changeLanguage(newLang);
  }

  /**
   * Changes the language and emits the change event to parent components.
   * @param lang The new language to switch to
   */
  changeLanguage(lang: string): void {
    this.myTranslateService.changeLanguage(lang);
    this.currentLanguage = lang;
    this.languageChange.emit(lang);
  }

  /**
   * Toggles the visibility of the navbar (e.g., in mobile view).
   */
  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
    const navbar = document.getElementById('navbarSupportedContent');

    if (navbar) {
      if (this.isNavbarOpen) {
        // Open the navbar
        this.renderer.removeClass(navbar, 'd-none');
        this.renderer.addClass(navbar, 'd-block');
      } else {
        // Close the navbar
        this.renderer.addClass(navbar, 'd-none');
        this.renderer.removeClass(navbar, 'd-block');
      }
    }
  }

  /**
   * Closes the navbar. Called when a nav link is clicked.
   */
  closeNavbar(): void {
    this.isNavbarOpen = false;
    const navbar = document.getElementById('navbarSupportedContent');

    if (navbar) {
      this.renderer.addClass(navbar, 'd-none');
      this.renderer.removeClass(navbar, 'd-block');
    }
  }

  /**
   * Scrolls to the top of the page. If not on the home page, navigates there first.
   * @param event The click event
   */
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
