import { Component, computed, input, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  breadcrumbHeading= input<string>('');
  items = computed<MenuItem[]>(() => [
    { label: 'Home', routerLink: '/' },
    { label: this.breadcrumbHeading() },
  ]);
}
