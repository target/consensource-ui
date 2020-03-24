/* eslint no-process-env: 0 */
/* eslint no-undef: 0 */

/**
 * Check if `val` is non-falsey or zero - else return null
 * @param {*} val
 */
const getFeatureFlagVal = (val: string): string | null => {
    if (val) {
        return val;
    } else {
        return null;
    }
};

export const featureFlagConfigs = {
    enableTestingBanner: getFeatureFlagVal(process.env.ENABLE_TESTING_BANNER),
    enableSignup: getFeatureFlagVal(process.env.ENABLE_SIGNUP),
};
