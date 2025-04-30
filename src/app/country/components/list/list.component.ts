import { Component, input } from '@angular/core';
import { RestCountry } from '../../interfaces/rest-country';
import { Country } from '../../interfaces/country';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './list.component.html',
})
export class ListComponent {

  countries = input.required<Country[]>();



  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);


 
}
