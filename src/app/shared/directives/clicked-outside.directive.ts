import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, Inject, OnDestroy, Output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core'

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy{

  @Output() clickOutside = new EventEmitter<void>();

  documentClickSubscription: Subscription | undefined;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document: Document) { }

  ngAfterViewInit(): void {
      this.documentClickSubscription = fromEvent(this.document, 'click').pipe(filter(event => {
        return !this.isInside(event?.target as HTMLElement)
      })).subscribe(() => {
        this.clickOutside.emit()
      })
  }

  ngOnDestroy(): void {
      this.documentClickSubscription?.unsubscribe()
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return elementToCheck === this.element.nativeElement || this.element.nativeElement.contains(elementToCheck)
  }

}
