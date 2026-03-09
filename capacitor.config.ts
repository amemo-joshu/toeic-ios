import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.amenomori.toeicplus',
  appName: 'TOEIC 700+ MASTER',
  webDir: 'dist',
  server: {
    url: 'https://toeicplus.com',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
    scrollEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#1e1b4b',
      iosSpinnerStyle: 'large',
      spinnerColor: '#f59e0b',
      showSpinner: true,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1e1b4b',
      overlaysWebView: false,
    },
  },
};

export default config;
