import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.amenomori.toeicplus',
  appName: 'TOEIC 700+ MASTER',
  webDir: 'dist',
  server: {
    url: 'https://www.amenomori-app.com',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
    scrollEnabled: true,
    // Web側がiOSアプリを識別するためのUAマーカー
    // （Stripe購入UIの非表示・TOEICセクションへの誘導に使用）
    appendUserAgent: 'AmenomoriIOSApp',
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
