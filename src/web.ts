import { WebPlugin } from '@capacitor/core';
import { GoogleLoginOptions, GoogleLoginPlugin, GoogleLoginResponse } from './definitions';

declare var window: any;
declare var gapi: any;

export class GoogleLoginWeb extends WebPlugin implements GoogleLoginPlugin {

  private gapiLoaded: boolean;
  private auth2: any;

  constructor() {
    super({
      name: 'GoogleLogin',
      platforms: ['web']
    });
  }

  load() {
    window.googleAsyncInit = () => {
      console.log('Init Google JS SDK');
      gapi.load('auth2', () => {
        this.gapiLoaded = true;
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s);
      js.id = id;
      (js as HTMLScriptElement).src = 'https://apis.google.com/js/client:platform.js?onload=googleAsyncInit';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  async authenticate(options: GoogleLoginOptions): Promise<GoogleLoginResponse> {
    return new Promise<any>((resolve, reject) => {
      if (!this.gapiLoaded) {
        reject("Google Api hasn't loaded");
      }

      this.auth2 = gapi.auth2.init({
        client_id: options.serverAppId,
        scope: options.scopes.join("+")
      });

      this.auth2.grantOfflineAccess().then(resolve)
    });
  }
}

const GoogleLogin = new GoogleLoginWeb();

export { GoogleLogin };
