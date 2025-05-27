import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule,TranslatePipe,CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {
  // Inject TranslateService to handle internationalization
  translate = inject(TranslateService);

  // Input signal for the heading key used in breadcrumb label translation
  breadcrumbHeading = input<string>('');

  private destroyRef = inject(DestroyRef);

  // Signal to hold the breadcrumb items to be rendered in the UI
  breadcrumb_items = signal<MenuItem[]>([]);

  ngOnInit() {
    // Observable that emits when the active language changes
    const lang$ = this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef));

    // Function to update breadcrumb items with translated labels
    const updateItems = () => {
      const headingKey = this.breadcrumbHeading(); // Get the current heading key

      // Fetch translations for the home label and the dynamic heading
      this.translate.get(['BREADCRUMB.HOME', headingKey]).subscribe((translations) => {
        // Update the breadcrumb items signal with the translated values
        this.breadcrumb_items.set([
          { label: translations['BREADCRUMB.HOME'], routerLink: '/' },
          { label: translations[headingKey] },
        ]);
      });
    };

    // Initial setup of breadcrumb items when the component loads
    updateItems();

    // Re-run updateItems whenever the language changes
    lang$.subscribe(updateItems);
  }
  
}
