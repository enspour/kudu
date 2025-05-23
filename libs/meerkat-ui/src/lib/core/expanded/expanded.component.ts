import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  linkedSignal,
} from '@angular/core';

export type ExpandedStatus = 'idle' | 'transition';

@Component({
  selector: 'mk-expanded',
  imports: [],
  templateUrl: './expanded.component.html',
  styleUrl: './expanded.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkExpandedComponent implements AfterViewInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  public isOpen = input(false);

  public status = linkedSignal({
    source: this.isOpen,
    computation: (_, previous) => (previous ? 'transition' : 'idle'),
  });

  ngAfterViewInit(): void {
    this.updateHeight();
  }

  @HostBinding('class.opened')
  public get IsOpen() {
    return this.isOpen();
  }

  @HostBinding('class.transition')
  public get Transition() {
    return this.status() === 'transition';
  }

  @HostListener('transitionstart')
  public onTransitionStart() {
    this.updateHeight();
  }

  @HostListener('transitionend')
  public onTransitionEnd() {
    this.status.set('idle');
  }

  private updateHeight() {
    const element = this.elementRef.nativeElement;
    const height = this.isOpen() ? element.scrollHeight : 0;
    element.style.setProperty('--height', `${height}px`);
  }
}
