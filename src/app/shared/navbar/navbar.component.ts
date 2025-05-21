import { CommonModule, NgIf } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
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
  constructor(private router: Router) {}
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
  scrollToTop(event: Event) {
    // Stop the default behavior completely
    event.preventDefault();
    event.stopPropagation();

    // Check if we're already on the home page
    if (this.router.url === '/home') {
      // Use scrollTo with smooth behavior
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home and then scroll
      this.router.navigate(['/home']).then(() => {
        // Small timeout to ensure DOM is ready
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      });
    }
  }
  @ViewChild('navbarDefault') navbar!: ElementRef;

  toggleNavbar(): void {
    this.navbar.nativeElement.classList.toggle('hidden');
  }
}
