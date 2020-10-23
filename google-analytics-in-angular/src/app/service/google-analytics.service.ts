import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GOOGLE_ANALYTICS_KEY } from '../app.constant';

declare var gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(private router: Router) {

  }

  public event(eventName: string, params: {}) {
    gtag('event', eventName, params);
  }

  public init() {
    this.listenForRouteChanges();

    try {

      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ANALYTICS_KEY;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '` + GOOGLE_ANALYTICS_KEY + `', {'send_page_view': false});
      `;
      document.head.appendChild(script2);
    } catch (ex) {
      console.error('Error appending google analytics');
      console.error(ex);
    }
  }

  private listenForRouteChanges() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', GOOGLE_ANALYTICS_KEY, {
          'page_path': event.urlAfterRedirects,
        });
        console.log('Sending Google Analytics hit for route', event.urlAfterRedirects);
        console.log('Property ID', GOOGLE_ANALYTICS_KEY);
      }
    });
  }
}
