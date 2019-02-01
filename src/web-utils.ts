import { GoogleLoginOptions } from './definitions';

export class WebUtils {
  /**
   * Public only for testing
   */
  static getAppId(options: GoogleLoginOptions): string {
    let appId = options.serverAppId;
    if (options.web && options.web.appId && options.web.appId.length > 0) {
      appId = options.web.appId;
    }
    return appId;
  }

  /**
   * Public only for testing
   */
  static getAuthorizationUrl(options: GoogleLoginOptions): string {
    const appId = this.getAppId(options);
    let baseUrl = options.authorizationBaseUrl + '?client_id=' + appId;

    baseUrl += '&response_type=code';

    if (options.web.redirectUrl) {
      baseUrl += '&redirect_uri=' + options.web.redirectUrl;
    }
    if (options.scopes) {
      baseUrl += '&scope=' + options.scopes.join(" ");
    }

    if (!options.stateDisabled) {
      if (!options.state || options.state.length === 0) {
        options.state = this.randomString();
      }

      baseUrl += '&state=' + options.state;
    }
    console.log(baseUrl);
    baseUrl = encodeURI(baseUrl);
    console.log(baseUrl);
    return baseUrl;
  }

  /**
   * Public only for testing
   */
  static getUrlParams(search: string): any | undefined {
    if (search && search.trim().length > 0) {
      search = search.trim();
      let idx = search.indexOf('#');
      if (idx === -1) {
        idx = search.indexOf('?');
      }
      if (idx !== -1 && search.length > (idx + 1)) {
        const urlParamStr = search.slice(idx + 1);
        const keyValuePairs: string[] = urlParamStr.split(`&`);
        return keyValuePairs.reduce((acc, hash) => {
          const [key, val] = hash.split(`=`);
          if (key && key.length > 0) {
            return {
              ...acc,
              [key]: decodeURIComponent(val)
            };
          }
        }, {});
      }

    }
    return undefined;
  }

  static randomString(length: number = 10) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

}
