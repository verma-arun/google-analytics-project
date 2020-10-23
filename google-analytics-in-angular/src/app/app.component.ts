import { Component } from '@angular/core';
import { GoogleAnalyticsService } from './service/google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'google-analytics-in-angular';

  constructor(private googleAnalyticsService: GoogleAnalyticsService,) {

  }

  ngOnInit() {
    console.log('on init is called');
  }
}
