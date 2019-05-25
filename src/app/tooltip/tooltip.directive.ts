import { ComponentRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from './tooltip.component';

@Directive({ selector: '[tooltip]' })
export class TooltipDirective implements OnInit {

  private clickedInside = false;
  @Input('tooltip') text = '';
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef) {
                this.text = 'no clicks';
  }

  ngOnInit(): void {
    //to position tool tip above the button
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });
    
  }

  @HostListener('click')
  onClick() {
    
    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
    tooltipRef.instance.text = this.text;
    this.clickedInside = true;
  }

  //For Escape key press requirement to remove tool tip
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) 
  {
    this.overlayRef.detach();
  }

  //When we click out of dom this method will remove the tool tip display
  @HostListener('document:click')
  onClickOut() {
    if (!this.clickedInside) {
      this.overlayRef.detach();
    }
    this.clickedInside = false;
  }
}