declare global {
    interface PluginRegistry {
        GoogleLogin?: GoogleLoginPlugin;
    }
}
export interface GoogleLoginOptions {
    serverAppId: string;
    scopes: string[];
    web: {
        appId?: string;
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
