import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
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
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  translateService = inject(TranslateService);
  myTranslateService = inject(MyTranslateService);
  ngxSpinnerService = inject(NgxSpinnerService);

  currentLanguage: string = 'ar'; // default language
  isLoading: boolean = true;
  ngOnInit(): void {
    this.isLoading = true;
    // this.ngxSpinnerService.show();
    // Subscribe to language change
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
      this.stopLoading();
    });

    // fallback in case language is already set
    if (this.translateService.currentLang) {
      this.currentLanguage = this.translateService.currentLang;
      this.stopLoading();
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
      this.isLoading = false;
      // this.ngxSpinnerService.hide();
    }, 500); // تأخير بسيط لضمان تهيئة الترجمة
  }
}
