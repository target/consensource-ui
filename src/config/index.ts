/* eslint no-process-env: 0 */
/* eslint no-undef: 0 */

/**
 * Returns null if a passed feature flag doesn't exist
 * @param val
 */
const getFeatureFlagVal = (val?: string): string | null => val || null;

export const featureFlagConfigs = {
    enableTestingBanner: getFeatureFlagVal(process.env.ENABLE_TESTING_BANNER),
    enableSignup: getFeatureFlagVal(process.env.ENABLE_SIGNUP),
};
