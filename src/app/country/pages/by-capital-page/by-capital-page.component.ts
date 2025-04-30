import {
  Component,
  inject,
  input,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'country-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export default class ByCapitalPageComponent {
  countryServie = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {


      if (!request.query) {
        this.router.navigate(['/country/by-capital']);
        return of([]);
      }

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,
        }
      })
      return this.countryServie.searchByCapital(request.query);
    },
  });

  // countryResorce = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryServie.searchByCapital(request.query)
  //     );
  //   },
  // });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(input: string) {
  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);

  //   this.countryServie.searchByCapital(input).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     }
  //   });
  // }
}
