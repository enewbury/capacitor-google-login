declare global {
    interface PluginRegistry {
        GoogleLogin?: GoogleLoginPlugin;
    }
}
export interface GoogleLoginPlugin {
    echo(options: {
        value: string;
    }): Promise<{
        value: string;
    }>;
}
