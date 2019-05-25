
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tooltip-component',
  styleUrls: ['./tooltip.component.css'],
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {

  @Input() text = '';
}