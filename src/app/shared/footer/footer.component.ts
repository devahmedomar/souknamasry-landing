import { Component, OnInit, signal, inject, DestroyRef } from '@angular/core';
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
  // Inject translation service and destroyRef for cleanup
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  // === Signals ===
  currentLang = signal('');
  languageReady = signal(false); 

  // Individual translated text signals
  des = signal('');
  linksTitle = signal('');
  contactTitle = signal('');
  followUsTitle = signal('');
  copyright = signal('');
  location = signal('');
  brandName = signal('');
  quickLinkLabels = signal<string[]>([]); // Quick links labels array

  // Map translation keys to their respective signals
  private signalsMap: { [key: string]: ReturnType<typeof signal> } = {
    'footer.description': this.des,
    'footer.linksTitle': this.linksTitle,
    'footer.contactTitle': this.contactTitle,
    'footer.followUsTitle': this.followUsTitle,
    'footer.copyright': this.copyright,
    'footer.location': this.location,
    'footer.brandName': this.brandName
  };

  // === Static Data ===

  // Footer quick links
  quickLinks = [
    { labelKey: 'footer.home', fragment: 'home', routerLink: '/' },
    { labelKey: 'footer.about', fragment: 'about', routerLink: '/' },
    { labelKey: 'footer.services', fragment: 'services', routerLink: '/' },
    { labelKey: 'footer.contact', fragment: null, routerLink: '/contact' }
  ];

  // Contact information (used for display only)
  contactInfo = {
    location: 'Cairo, Egypt',
    phone: '01208444481'
  };

  // Social media icons and URLs
  socialLinks = [
    { icon: 'pi-facebook', url: 'https://www.facebook.com/souknamasry/' },
    { icon: 'pi-whatsapp', url: 'https://wa.me/201208444481' },
    { icon: 'pi-linkedin', url: 'https://www.linkedin.com/company/souknamasry/' }
  ];

  // === Lifecycle hook ===
  ngOnInit() {
    const keys = Object.keys(this.signalsMap);
    const quickLinkKeys = this.quickLinks.map(link => link.labelKey);

    // Load translation values and update signals
    const updateTranslations = () => {
      this.translate.get([...keys, ...quickLinkKeys]).subscribe(trans => {
        // Update static signals
        for (const key of keys) {
          this.signalsMap[key].set(trans[key]);
        }
        // Update quick link labels
        this.quickLinkLabels.set(
          this.quickLinks.map(link => trans[link.labelKey])
        );
        this.languageReady.set(true); // Ready to render
      });
    };

    // React to language changes
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        this.currentLang.set(event.lang);
        this.languageReady.set(false);
        updateTranslations();
      });

    // Initial language setup
    const defaultLang = this.translate.currentLang || this.translate.getBrowserLang() || 'en';
    this.translate.use(defaultLang).subscribe(() => {
      this.currentLang.set(defaultLang);
      updateTranslations();
    });
  }

  // TrackBy function for *ngFor optimization
  trackByIndex(index: number): number {
    return index;
  }
}
