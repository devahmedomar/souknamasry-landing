import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
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
export class NavbarComponent {
  translateService = inject(TranslateService);
  myTranslateService = inject(MyTranslateService);
  @ViewChild('dropdown') dropdownElement!: ElementRef;
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;

  currentLanguage: string = 'en'; // default
  ngOnInit(): void {
    // Listen for language change to keep it updated
    this.translateService.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });

    // fallback in case currentLang is available at init
    if (this.translateService.currentLang) {
      this.currentLanguage = this.translateService.currentLang;
    }
  }

  changeLanguage(lang: string): void {
    this.myTranslateService.changeLanguage(lang);
    this.currentLanguage = lang;
  }
  ngAfterViewInit(): void {

    console.log(this.translateService.currentLang);
    this.dropdownElement.nativeElement.addEventListener(
      'hidden.bs.dropdown',
      () => {
        this.dropdownButton.nativeElement.classList.remove('open');
      }
    );

    this.dropdownElement.nativeElement.addEventListener(
      'show.bs.dropdown',
      () => {
        this.dropdownButton.nativeElement.classList.add('open');
      }
    );
  }
}
