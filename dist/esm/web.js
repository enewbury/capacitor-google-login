var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebPlugin } from '@capacitor/core';
import { WebUtils } from './web-utils';
export class GoogleLoginWeb extends WebPlugin {
    constructor() {
        super({
            name: 'GoogleLogin',
            platforms: ['web']
        });
        this.windowHandle = null;
        this.intervalId = null;
        this.loopCount = 1000;
        this.intervalLength = 100;
    }
    authenticate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!options.web && !options.web.redirectUrl) {
                    return reject(new Error('Required "web.redirectUrl" not found!'));
                }
                let loopCount = this.loopCount;
                this.windowHandle = window.open(WebUtils.getAuthorizationUrl(options), '_blank', 'height=600,width=600,left=0,top=0');
                this.intervalId = setInterval(() => {
                    if (loopCount-- < 0) {
                        this.closeWindow();
                    }
                    else {
                        let href;
                        try {
                            href = this.windowHandle.location.href;
                        }
                        catch (e) {
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
        });
    }
    processResponse(urlParamObj, href, options, resolve, reject) {
        clearInterval(this.intervalId);
        if (options.web.stateDisabled || urlParamObj.state === options.web.state) {
            if (href.match(/code=(.*)/)) {
                const code = urlParamObj.code;
                if (code) {
                    const resp = {
                        code: code,
                    };
                    resolve(resp);
                    this.closeWindow();
                }
                else {
                    reject(new Error('No code returned! Authentication failed!'));
                    this.closeWindow();
                }
            }
            else {
                if (href.indexOf(options.web.redirectUrl) === 0) {
                    reject(new Error('Code not found in redirect url!'));
                    this.closeWindow();
                }
            }
        }
        else {
            reject(new Error('State check not passed! Retrieved state does not match sent one!'));
            this.closeWindow();
        }
    }
    closeWindow() {
        clearInterval(this.intervalId);
        this.windowHandle.close();
    }
}
const GoogleLogin = new GoogleLoginWeb();
export { GoogleLogin };
//# sourceMappingURL=web.js.map