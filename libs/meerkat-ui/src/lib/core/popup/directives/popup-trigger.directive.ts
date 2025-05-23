import { Directive, inject } from '@angular/core';

import { MkActiveZoneDirective } from '../../active-zone';
import { MkOverlayFlexibleOriginDirective } from '../../overlay';
import { MkZoneDirective } from '../../zone';

import { MkPopupTrigger } from '../interfaces';

import { mkPopupTrigger } from '../tokens';

@Directive({
  selector: '[mkPopupTrigger]',
  exportAs: 'mkPopupTrigger',
  hostDirectives: [
    MkOverlayFlexibleOriginDirective,
    MkZoneDirective,
    MkActiveZoneDirective,
  ],
  host: {
    tabindex: '0',
  },
  providers: [
    { provide: mkPopupTrigger, useExisting: MkPopupTriggerDirective },
  ],
})
export class MkPopupTriggerDirective implements MkPopupTrigger {
  private activeZoneDirective = inject(MkActiveZoneDirective);

  public origin = inject(MkOverlayFlexibleOriginDirective);
  public isOpen = this.activeZoneDirective.active;

  public close() {
    this.activeZoneDirective.deactivate();
  }
}
