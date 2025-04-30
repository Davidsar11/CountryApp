import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Region } from '../../interfaces/region';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam (queryParam: string): string{
  const validRegions: Record<string,Region> = {
    'americas' :'Americas',
    'africa' :'Africa',
    'europe' :'Europe',
    'asia' :'Asia',
    'antarctic' :'Antarctic',
    'oceania' :'Oceania',
  }

  return validRegions[queryParam.toLowerCase()] ?? 'Americas';
}



@Component({
  selector: 'country-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {
  public clase: string = '';
  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryServie = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) {
        this.router.navigate(['/country/by-region']);
        return of([]);
      }

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.query,
        },
      });

      return this.countryServie.searchByRegion(request.query);
    },
  });
}
