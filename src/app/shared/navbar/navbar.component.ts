import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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
   readonly translateService = inject(TranslateService);
  private readonly myTranslateService = inject(MyTranslateService);
  changeLanguage(lang: string): void {
    this.myTranslateService.changeLanguage(lang);
  }

  currentLang(): string {
    return this.translateService.currentLang;
  }
  @ViewChild('dropdown') dropdownElement!: ElementRef;
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;

  ngAfterViewInit(): void {

    this.dropdownElement.nativeElement.addEventListener('hidden.bs.dropdown', () => {
    this.dropdownButton.nativeElement.classList.remove('open');
    });

    this.dropdownElement.nativeElement.addEventListener('show.bs.dropdown', () => {
      this.dropdownButton.nativeElement.classList.add('open');
    });
  }

}











