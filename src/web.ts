import { WebPlugin } from '@capacitor/core';
import { GoogleLoginPlugin } from './definitions';

export class GoogleLoginWeb extends WebPlugin implements GoogleLoginPlugin {
  constructor() {
    super({
      name: 'GoogleLogin',
      platforms: ['web']
    });
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return Promise.resolve({ value: options.value });
  }
}

const GoogleLogin = new GoogleLoginWeb();

export { GoogleLogin };
