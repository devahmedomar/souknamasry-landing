import { Component, NgModule, ViewChildren } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FragmentActiveDirective } from '../directives/fragment-active.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FragmentActiveDirective, CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
 
}

