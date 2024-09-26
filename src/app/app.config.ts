import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(AmplifyAuthenticatorModule)],
};
