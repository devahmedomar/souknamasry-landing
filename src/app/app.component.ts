import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser, NgIf, CommonModule } from '@angular/common'; // أضف CommonModule
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    NgxSpinnerComponent,
    RouterOutlet,
    NgIf,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  isLoading = true;
  private translationReady = new BehaviorSubject<boolean>(false);
  translationReady$ = this.translationReady.asObservable();

  constructor(
    private translateService: TranslateService,
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.spinner.show();
      const savedLang = localStorage.getItem('language') || 'ar';

      // ضبط اللغة الافتراضية
      this.translateService.setDefaultLang('ar');

      this.translateService.use(savedLang).subscribe(() => {
        const dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        this.renderer.setAttribute(document.documentElement, 'dir', dir);
        this.renderer.setAttribute(document.documentElement, 'lang', savedLang);

        // التأكد من تحميل الترجمة
        this.translateService.getTranslation(savedLang).subscribe(() => {
          this.translationReady.next(true); // الترجمة جاهزة
          setTimeout(() => {
            this.isLoading = false;
            this.spinner.hide();
          }, 500);
        });
      });
    }
  }

  changeLanguage(lang: string) {
    this.spinner.show();
    this.isLoading = true;
    localStorage.setItem('language', lang);

    this.translateService.use(lang).subscribe(() => {
      const dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.renderer.setAttribute(document.documentElement, 'dir', dir);
      this.renderer.setAttribute(document.documentElement, 'lang', lang);

      this.translateService.getTranslation(lang).subscribe(() => {
        this.translationReady.next(true);
        setTimeout(() => {
          this.isLoading = false;
          this.spinner.hide();
        }, 500);
      });
    });
  }
}
