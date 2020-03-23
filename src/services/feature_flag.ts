import { featureFlagConfigs } from 'App/config';

const isTestBannerEnabled = () => featureFlagConfigs.enableTestingBanner;
const isSignupEnabled = () => featureFlagConfigs.enableSignup;

module.exports = {
    isTestBannerEnabled,
    isSignupEnabled,
};
