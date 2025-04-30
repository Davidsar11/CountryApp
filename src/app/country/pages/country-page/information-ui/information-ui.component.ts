import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-ui',
  imports: [DecimalPipe],
  templateUrl: './information-ui.component.html',
})
export class InformationUiComponent {

    country = input.required<Country>();
 }
