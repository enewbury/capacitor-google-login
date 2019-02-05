var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
export class GoogleLoginWeb extends WebPlugin {
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
        (function (d, s, id) {
            let js;
            const fjs = d.getElementsByTagName(s)[0];
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://apis.google.com/js/client:platform.js?onload=googleAsyncInit';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'google-jssdk'));
    }
    authenticate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this.gapiLoaded) {
                    reject("Google Api hasn't loaded");
                }
                this.auth2 = gapi.auth2.init({
                    client_id: options.serverAppId,
                    scope: options.scopes.join("+")
                });
                this.auth2.grantOfflineAccess().then(resolve);
            });
        });
    }
}
const GoogleLogin = new GoogleLoginWeb();
export { GoogleLogin };
//# sourceMappingURL=web.js.map