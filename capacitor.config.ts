
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.1486fb255c704637a9d1afd042000402',
  appName: 'echo-team-mobile',
  webDir: 'dist',
  server: {
    url: 'https://1486fb25-5c70-4637-a9d1-afd042000402.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#5B21B6',
      showSpinner: false
    }
  }
};

export default config;
