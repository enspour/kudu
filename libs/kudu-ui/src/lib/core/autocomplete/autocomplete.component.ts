import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  HostListener,
  inject,
  InjectionToken,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KuduClickOutsideDirective } from '../click-outside';

import { KuduDropdownComponent, KuduDropdownPosition } from '../dropdown';
import { KuduOptions, KuduOptionsDirective } from '../options';
import { kuduSize } from '../size';
import { KuduZoneDirective } from '../zone';

export interface KuduAutocomplete {}

export const KuduAutocomplete = new InjectionToken<KuduAutocomplete>(
  'kudu-ui/autocomplete',
);

@Component({
  selector: 'kudu-autocomplete',
  imports: [FormsModule, KuduDropdownComponent],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: KuduAutocomplete, useExisting: KuduAutocompleteComponent },
  ],
  hostDirectives: [
    {
      directive: KuduClickOutsideDirective,
      outputs: ['byClickOutside'],
    },
    {
      directive: KuduOptionsDirective,
      inputs: ['value', 'multiple'],
      outputs: ['valueChange', 'byOptionClick'],
    },
    { directive: KuduZoneDirective },
  ],
})
export class KuduAutocompleteComponent implements KuduAutocomplete {
  private options = inject(KuduOptions);
  public size = inject(kuduSize);

  public isOpen = model(false);

  public text = model<string>('');

  public placeholder = input<string>('');

  public optionsPosition = model<KuduDropdownPosition>('top');

  constructor() {
    effect(() => this.options.filterByInnerText(this.text()));
  }

  @HostBinding('class')
  public get Classes() {
    return `${this.size()} ${this.isOpen() ? 'opened' : ''} ${this.optionsPosition()}`;
  }

  @HostListener('click')
  public onClick() {
    this.isOpen.set(true);
  }

  @HostListener('byClickOutside')
  public onClickOutside() {
    this.isOpen.set(false);
  }
}
