import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { InformationUiComponent } from "./information-ui/information-ui.component";

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, InformationUiComponent],
  templateUrl: './country-page.component.html',
})
export default class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({code : this.countryCode}),
    loader: ({request}) => {
      return this.countryService.searchByAplhaCode(request.code);
    },
  });
}
