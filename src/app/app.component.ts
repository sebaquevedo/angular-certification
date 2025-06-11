import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Required for routerLink, routerLinkActive, router-outlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Make sure RouterModule is here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // The title property was used by the default Angular app,
  // but we've hardcoded the title in app.component.html's h1
  // and in index.html's <title> tag.
  // So, this property is not strictly necessary anymore unless used elsewhere.
  // title = 'My Angular Store';
}
