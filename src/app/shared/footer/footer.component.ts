import { Component,OnInit,signal,inject,DestroyRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FragmentActiveDirective } from '../directives/fragment-active.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FragmentActiveDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  // Current language as signal
  currentLang = signal(this.translate.currentLang);

  // Translated text signals
  des = signal('');
  linksTitle = signal('');
  contactTitle = signal('');
  followUsTitle = signal('');
  copyright = signal('');
  location = signal('');
  brandName = signal('');
  quickLinkLabels = signal<string[]>([]);

  // Mapping of translation keys to signals
  private signalsMap: { [key: string]: ReturnType<typeof signal> } = {
    'footer.description': this.des,
    'footer.linksTitle': this.linksTitle,
    'footer.contactTitle': this.contactTitle,
    'footer.followUsTitle': this.followUsTitle,
    'footer.copyright': this.copyright,
    'footer.location': this.location,
    'footer.brandName': this.brandName
  };

  // Quick Links Data
  quickLinks = [
    { labelKey: 'footer.home', fragment: 'home', routerLink: '/' },
    { labelKey: 'footer.about', fragment: 'about', routerLink: '/' },
    { labelKey: 'footer.services', fragment: 'services', routerLink: '/' },
    { labelKey: 'footer.contact', fragment: null, routerLink: '/contact' }
  ];

  // Contact Info
  contactInfo = {
    location: 'Cairo, Egypt',
    phone: '01208444481'
  };

  // Social Media Links
  socialLinks = [
    { icon: 'pi-facebook', url: 'https://www.facebook.com/souknamasry/' },
    { icon: 'pi-whatsapp', url: 'https://wa.me/201208444481' },
    { icon: 'pi-linkedin', url: 'https://www.linkedin.com/company/souknamasry/' }
  ];

  ngOnInit() {
    const keys = Object.keys(this.signalsMap);

    const updateTranslations = () => {
      const quickLinkKeys = this.quickLinks.map(link => link.labelKey);
      this.translate.get([...keys, ...quickLinkKeys]).subscribe(trans => {
        // Update text signals
        for (const key of keys) {
          this.signalsMap[key].set(trans[key]);
        }

        // Update quick links labels
        this.quickLinkLabels.set(this.quickLinks.map(link => trans[link.labelKey]));
      });
    };

    // On language change
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        this.currentLang.set(event.lang);
        updateTranslations();
      });

    // Initial translation
    updateTranslations();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
