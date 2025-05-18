import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { CardModule } from 'primeng/card';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { contactData } from './contact-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbComponent,CardModule,TranslatePipe],  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit{
  contact_data = contactData

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => AOS.init());
      }
    }   
}
