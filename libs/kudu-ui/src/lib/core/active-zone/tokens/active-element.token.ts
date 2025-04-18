import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  of,
  repeat,
  share,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';

export const kuduActiveElement = new InjectionToken('kudu-ui/active-element', {
  factory: () => {
    const document = inject(DOCUMENT);

    const focusout$ = fromEvent<FocusEvent>(document, 'focusout');
    const focusin$ = fromEvent<FocusEvent>(document, 'focusin');
    const mousedown$ = fromEvent<Event>(document, 'mousedown');
    const mouseup$ = fromEvent<Event>(document, 'mouseup');

    const loss$ = focusout$.pipe(
      takeUntil(mousedown$),
      repeat({ delay: () => mouseup$ }),
      filter(({ relatedTarget }) => !!relatedTarget),
      map(({ relatedTarget }) => relatedTarget as HTMLElement | null),
    );

    const gain$ = focusin$.pipe(
      map(({ target }) => target as HTMLElement | null),
    );

    const mouse$ = mousedown$.pipe(
      switchMap(({ target }) =>
        document.activeElement === document.body
          ? of(target as HTMLElement | null)
          : focusout$.pipe(
              take(1),
              takeUntil(timer(0)),
              map(() => target as HTMLElement | null),
            ),
      ),
    );

    return merge(loss$, gain$, mouse$).pipe(distinctUntilChanged(), share());
  },
});
