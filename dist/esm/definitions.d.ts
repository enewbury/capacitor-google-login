declare global {
    interface PluginRegistry {
        GoogleLogin?: GoogleLoginPlugin;
    }
}
export interface GoogleLoginOptions {
    serverAppId: string;
    authorizationBaseUrl: string;
    stateDisabled?: boolean;
    scopes: string[];
    state?: string;
    web: {
        appId?: string;
        redirectUrl: string;
    };
    ios: {
        appId: string;
    };
}
export interface GoogleLoginResponse {
    code?: string;
    token?: string;
    state?: string;
}
export interface GoogleLoginPlugin {
    authenticate(options: GoogleLoginOptions): Promise<GoogleLoginResponse>;
}
