import { WebPlugin } from '@capacitor/core';
import { GoogleLoginOptions, GoogleLoginPlugin, GoogleLoginResponse } from './definitions';
export declare class GoogleLoginWeb extends WebPlugin implements GoogleLoginPlugin {
    private gapiLoaded;
    private auth2;
    constructor();
    load(): void;
    authenticate(options: GoogleLoginOptions): Promise<GoogleLoginResponse>;
}
declare const GoogleLogin: GoogleLoginWeb;
export { GoogleLogin };
