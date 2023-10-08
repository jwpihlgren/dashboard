import auth from '../../auth_config.json'

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  path: "",
  auth: {
    domain: auth.domain,
    clientId: auth.clientId,
    redirectUri: `${window.location.origin}${auth.redirectTargetDev}`,
    redirectTarget: `${window.location.origin}${auth.redirectTargetDev}`,
    redirectPath: `${auth.redirectTargetDev}`,
    audience: auth.audience,
    scope: auth.scope
  },
  dev: {
    serverUrl: auth.serverUrl
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
