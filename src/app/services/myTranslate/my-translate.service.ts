import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private defaultLang = 'ar';

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.translateService.setDefaultLang(this.defaultLang);
      this.setLanguageAndDirection();
    }
  }

  private setLanguageAndDirection(lang?: string): void {
    if (isPlatformBrowser(this.platformId)) {

      const selectedLang =
        lang || localStorage.getItem('lang') || this.defaultLang;

      localStorage.setItem('lang', selectedLang);


      this.translateService.use(selectedLang);

      if (selectedLang === 'en') {
        this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
      } else {
        this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
      }
    }
  }

  changeLanguage(lang: string): void {
    this.setLanguageAndDirection(lang);
  }
}
