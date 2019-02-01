import { WebPlugin } from '@capacitor/core';
import { GoogleLoginPlugin } from './definitions';
export declare class GoogleLoginWeb extends WebPlugin implements GoogleLoginPlugin {
    constructor();
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
declare const GoogleLogin: GoogleLoginWeb;
export { GoogleLogin };
