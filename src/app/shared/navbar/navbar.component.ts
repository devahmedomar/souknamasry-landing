import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FragmentActiveDirective } from '../directives/fragment-active.directive';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FragmentActiveDirective, CommonModule, RouterModule, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  private readonly translateService = inject(TranslateService);
  private readonly myTranslateService = inject(MyTranslateService)
  changeLanguage(lang: string): void {
    this.myTranslateService.changeLanguage(lang);
  }

  currentLang(lang:string): boolean {
    return this.translateService.currentLang === lang ;
  }

}

