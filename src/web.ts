import { WebPlugin } from '@capacitor/core';
import { GoogleLoginOptions, GoogleLoginPlugin, GoogleLoginResponse } from './definitions';
import { WebUtils } from './web-utils';

export class GoogleLoginWeb extends WebPlugin implements GoogleLoginPlugin {

  private windowHandle: Window = null;
  private intervalId: number = null;
  private loopCount = 1000;
  private intervalLength = 100;

  constructor() {
    super({
      name: 'GoogleLogin',
      platforms: ['web']
    });
  }

  async authenticate(options: GoogleLoginOptions): Promise<GoogleLoginResponse> {
    return new Promise<any>((resolve, reject) => {
      if (!options.web && !options.web.redirectUrl) {
        return reject(new Error('Required "web.redirectUrl" not found!'));
      }

      let loopCount = this.loopCount;

      this.windowHandle = window.open(WebUtils.getAuthorizationUrl(options), '_blank', 'height=600,width=600,left=0,top=0');

      this.intervalId = setInterval(() => {
        if (loopCount-- < 0) {
          this.closeWindow();
        } else {
          let href: string;
          try {
            href = this.windowHandle.location.href;
          } catch (e) {
            console.log(e);
          }
          if (href != null) {
            const urlParamObj = WebUtils.getUrlParams(href);
            if (urlParamObj) {
              this.processResponse(urlParamObj, href, options, resolve, reject);
            }
          }
        }
      }, this.intervalLength);
    });
  }

  private processResponse(urlParamObj: { state: string, code: string }, href: string, options: GoogleLoginOptions, resolve: Function, reject: Function) {
    clearInterval(this.intervalId);
    if (options.stateDisabled || urlParamObj.state === options.state) {
      if (href.match(/code=(.*)/)) {
        const code = urlParamObj.code;
        if (code) {
          const resp = {
            code: code,
          };
          resolve(resp);
          this.closeWindow();
        } else {
          reject(new Error('No code returned! Authentication failed!'));
          this.closeWindow();
        }
      } else {
        if (href.indexOf(options.web.redirectUrl) === 0) {
          reject(new Error('Code not found in redirect url!'));
          this.closeWindow();
        }
      }
    } else {
      reject(new Error('State check not passed! Retrieved state does not match sent one!'));
      this.closeWindow();
    }
  }

  private closeWindow() {
    clearInterval(this.intervalId);
    this.windowHandle.close();
  }
}

const GoogleLogin = new GoogleLoginWeb();

export { GoogleLogin };
