import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, signal } from '@angular/core';

import {
  WORKSPACE_SCALING_DELTA,
  WORKSPACE_SCALING_MAX,
  WORKSPACE_SCALING_MIN,
  WORKSPACE_SCROLLING_DELTA,
} from '../constants/workspace.constants';

import { Point } from '../../../interfaces';
import {
  KuduFlowWorkspaceOffset,
  KuduFlowWorkspaceScale,
  KuduFlowWorkspaceScroll,
} from '../interfaces';

@Injectable()
export class KuduFlowWorkspaceService {
  private readonly _offset = signal({ left: 0, top: 0 });
  public readonly offset = this._offset.asReadonly();

  private readonly _scroll = signal<KuduFlowWorkspaceScroll>({ x: 0, y: 0 });
  public readonly scroll = this._scroll.asReadonly();

  private readonly _scale = signal<KuduFlowWorkspaceScale>(1);
  public readonly scale = this._scale.asReadonly();

  private readonly _scalableRef = signal<ElementRef<HTMLElement | undefined>>({
    nativeElement: undefined,
  });

  public readonly scalableRef = this._scalableRef.asReadonly();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public setOffset(offset: KuduFlowWorkspaceOffset) {
    this._offset.set(offset);
  }

  public setScroll(scroll: KuduFlowWorkspaceScroll) {
    this._scroll.set(scroll);
  }

  public setScale(scale: KuduFlowWorkspaceScale) {
    this._scale.set(scale);
  }

  public setScalableRef(ref: ElementRef<HTMLElement>) {
    this._scalableRef.set(ref);
  }

  public scrollLeft() {
    const scroll = this.scroll();
    const scale = this.scale();

    this._scroll.set({
      ...scroll,
      x: scroll.x + WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollRight() {
    const scroll = this.scroll();
    const scale = this.scale();

    this._scroll.set({
      ...scroll,
      x: scroll.x - WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollUp() {
    const scroll = this.scroll();
    const scale = this.scale();

    this._scroll.set({
      ...scroll,
      y: scroll.y + WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollDown() {
    const scroll = this.scroll();
    const scale = this.scale();

    this._scroll.set({
      ...scroll,
      y: scroll.y - WORKSPACE_SCROLLING_DELTA / scale,
    });
  }

  public scrollBack() {
    const scalableRef = this.scalableRef();

    if (!this.document.defaultView || !scalableRef.nativeElement) {
      return;
    }

    const { width, height } = scalableRef.nativeElement.getBoundingClientRect();

    const elementCenter = {
      x: width / 2,
      y: height / 2,
    };

    const windowCenter = {
      x: (this.document.defaultView.innerWidth - this.offset().left) / 2,
      y: (this.document.defaultView.innerHeight - this.offset().top) / 2,
    };

    this._scroll.set({
      x: windowCenter.x - elementCenter.x,
      y: windowCenter.y - elementCenter.y,
    });
  }

  public scaleIn(mousePosition: Point) {
    const scale = this.scale();
    const nextScale = scale + WORKSPACE_SCALING_DELTA * scale;
    return this.scaling(nextScale, mousePosition);
  }

  public scaleOut(mousePosition: Point) {
    const scale = this.scale();
    const nextScale = scale + -1 * WORKSPACE_SCALING_DELTA * scale;
    return this.scaling(nextScale, mousePosition);
  }

  public scaleTo(nextScale: number) {
    if (!this.document.defaultView) {
      return;
    }

    const mousePosition = {
      x: (this.document.defaultView.innerWidth - this.offset().left) / 2,
      y: (this.document.defaultView.innerHeight - this.offset().top) / 2,
    };

    return this.scaling(nextScale, mousePosition);
  }

  private scaling(nextScale: number, mousePosition: Point) {
    const scroll = this.scroll();
    const scale = this.scale();

    if (WORKSPACE_SCALING_MIN > nextScale) {
      nextScale = WORKSPACE_SCALING_MIN;
    }

    if (WORKSPACE_SCALING_MAX < nextScale) {
      nextScale = WORKSPACE_SCALING_MAX;
    }

    const diff = {
      x: scroll.x / scale - mousePosition.x / scale,
      y: scroll.y / scale - mousePosition.y / scale,
    };

    this._scroll.set({
      x: scroll.x + diff.x * (nextScale - scale),
      y: scroll.y + diff.y * (nextScale - scale),
    });

    this._scale.set(nextScale);
  }
}