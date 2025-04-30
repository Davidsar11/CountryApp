import { Component, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { RestCountry } from '../../interfaces/rest-country';
import { Country } from '../../interfaces/country';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'country- by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
})
export default class ByCountryPageComponent {
  countryServie = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) {
        this.router.navigate(['/country/by-country']);
        return of([]);
      }

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        }
      })

      return this.countryServie.searchByCountry(request.query);
    },
  });

}
