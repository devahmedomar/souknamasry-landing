import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FragmentActiveDirective } from '../directives/fragment-active.directive';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule , CommonModule , FragmentActiveDirective,],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  quickLinks = [
    { label: 'Home', fragment: 'home', routerLink: '/' },
    { label: 'About', fragment: 'about', routerLink: '/' },
    { label: 'Services', fragment: 'services', routerLink: '/' },
    { label: 'Contact', fragment: null, routerLink: '/contact' }
  ];

  contactInfo = {
    location: 'Cairo, Egypt',
    email: 'Souknamasry22&#64;gmail.com',
    phone: '01208444481'
  };
  // displayEmail = ' Souknamasry22@gmail.com';

  socialLinks = [
    { icon: 'pi-facebook', url: 'https://www.facebook.com/souknamasry/' },
    { icon: 'pi-whatsapp', url: 'https://wa.me/201208444481' },
    { icon: 'pi-linkedin', url: 'https://www.linkedin.com/company/souknamasry/' }
  ];
}
