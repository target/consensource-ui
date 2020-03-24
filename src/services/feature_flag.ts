import { featureFlagConfigs } from 'App/config';

export const isTestBannerEnabled = () => featureFlagConfigs.enableTestingBanner;
export const isSignupEnabled = () => featureFlagConfigs.enableSignup;
