import { AfterViewInit, Component,  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'
import AOS from 'aos';
import { TranslateModule} from '@ngx-translate/core';


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})

export class ServicesComponent implements AfterViewInit {
  // Injects the PLATFORM_ID token to determine whether the code is running on the browser or server
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        AOS.init({ once: false });
      });
    }
  }
  
  services = [
    {
      title: 'servicesSection.cards.0.title',
      description: 'servicesSection.cards.0.description',
      image: 'assets/images/ser1.jpg'
    },
    {
      title: 'servicesSection.cards.1.title',
      description: 'servicesSection.cards.1.description',
      image: 'assets/images/ser2.avif'
    },
    {
      title: 'servicesSection.cards.2.title',
      description: 'servicesSection.cards.2.description',
      image: 'assets/images/ser3.avif'
    },
    {
      title: 'servicesSection.cards.3.title',
      description: 'servicesSection.cards.3.description',
      image: 'assets/images/ser4.avif'
    },
    {
      title: 'servicesSection.cards.4.title',
      description: 'servicesSection.cards.4.description',
      image: 'assets/images/ser5.jpg'
    },
    {
      title: 'servicesSection.cards.5.title',
      description: 'servicesSection.cards.5.description',
      image: 'assets/images/ser6.jpg'
    }
  ];
  

}