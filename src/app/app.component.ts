import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from "./shared/pages/app-footer/app-footer.component";
import localEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppFooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'country-app';
  
}
