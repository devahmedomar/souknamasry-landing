import { AfterViewInit, Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { CardModule } from 'primeng/card';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { contactData } from './contact-data';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbComponent,CardModule,TranslatePipe,ButtonModule],  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit{
  contact_data = contactData
  translate=inject(TranslateService)
  private platformId = inject(PLATFORM_ID)
  
  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => AOS.init());
      }
    }   
}
