import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { authHttpInterceptorFn, provideAuth0 } from "@auth0/auth0-angular";
import { environment } from "src/environments/environment";
import { routes } from "./app.routes";
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { sv } from 'date-fns/locale';

const swedishConfig = new DateFnsConfigurationService()
swedishConfig.setLocale(sv)
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: DateFnsConfigurationService, useValue: swedishConfig},
    provideAuth0({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: environment.auth.redirectUri,
        audience: environment.auth.audience,
        scope: environment.auth.scope
      },
      httpInterceptor: {
        allowedList: [
          `${environment.dev.serverUrl}/sensors`,
          `${environment.dev.serverUrl}/sensors/*`,
          `${environment.dev.serverUrl}/location`,
          `${environment.dev.serverUrl}/weather`,
          `${environment.dev.serverUrl}/user/`,
          `${environment.dev.serverUrl}/user/*`,
          `${environment.dev.serverUrl}/hass/*`
        ]
      }
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideRouter(routes)

  ]

}
