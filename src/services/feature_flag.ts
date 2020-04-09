import { featureFlagConfigs } from 'App/config';

export const isTestBannerEnabled = (): string => featureFlagConfigs.enableTestingBanner;
export const isSignupEnabled = (): string => featureFlagConfigs.enableSignup;
