import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {


  placeholder = input<string>();
  emitir = output<string>();
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(() => this.initialValue());


  debounceEffect =  effect((onCleanup) => {
    const value = this.inputValue();
    
    const timeout = setTimeout(() => {
      this.emitir.emit(value);
    },700);
    onCleanup(( ) => {
      clearTimeout(timeout);
    })
  });
}
