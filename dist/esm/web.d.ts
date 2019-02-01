import { WebPlugin } from '@capacitor/core';
import { GoogleLoginOptions, GoogleLoginPlugin, GoogleLoginResponse } from './definitions';
export declare class GoogleLoginWeb extends WebPlugin implements GoogleLoginPlugin {
    private windowHandle;
    private intervalId;
    private loopCount;
    private intervalLength;
    constructor();
    authenticate(options: GoogleLoginOptions): Promise<GoogleLoginResponse>;
    private processResponse;
    private closeWindow;
}
declare const GoogleLogin: GoogleLoginWeb;
export { GoogleLogin };
