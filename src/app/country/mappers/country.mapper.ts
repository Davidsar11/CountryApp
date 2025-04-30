import { Country } from '../interfaces/country';
import { RestCountry } from '../interfaces/rest-country';

export class CountryMapper{




  static mapRestCountryToCountry (item: RestCountry) : Country {
    return {
      cca2: item.cca2,
      flag: item.flag,
      flagSvg: item.flags.svg,
      // name: item.name.common,
      name: item.translations['spa'].common ?? 'No Spanish Name',
      capital: item.capital ? item.capital[0] : '',
      // capital: item.capital[0],
      population: item.population,
      region: item.region,
      borders: item.borders,
    }





  }

  static mapRestCountriesToCountries(items: RestCountry[]) : Country[] {
    console.log(items);
    return items.map( this.mapRestCountryToCountry);
  }


}
