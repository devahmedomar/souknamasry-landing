import { AfterViewInit, Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { CardModule } from 'primeng/card';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { contactData } from './contact-data';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [BreadcrumbComponent,CardModule,TranslatePipe,ButtonModule,FormsModule],  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit{

  // Contact page data (e.g. title, info, etc.)
  contact_data = contactData

  // Inject translation service for i18n
  translate=inject(TranslateService)

  // Inject platform ID to check if the app is running in the browser
  private platformId = inject(PLATFORM_ID)

  // Variables to handle success message display
  successMessage = false;
  successName = '';

  ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => AOS.init());
      }
  }   
  
  // Function to send email using EmailJS
  sendEmail(form: NgForm) {
      if (form.invalid) {
        form.control.markAllAsTouched();
        return;
      }

      emailjs.send(
        environment.serviceId,
        environment.templateId,
        {
          fullname: form.value.fullname,
          email: form.value.email,
          message: form.value.message
        },
        environment.emailJsUserId
      )
      .then(() => {
        this.successMessage = true;
        this.successName = form.value.fullname;
        form.reset(); 

        setTimeout(() => {
          this.successMessage = false;
        }, 8000); 
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
      });
  }

}
