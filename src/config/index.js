/* eslint no-process-env: 0 */
/* eslint no-undef: 0 */

/**
 * Check if `val` is non-falsey or zero - else return null
 * @param {*} val 
 */
const getFeatureFlagVal = (val) => {
    if (val === 0) {
        return val
    } else if (val) {
        return val
    } else {
        return null
    }
}

const featureFlagConfigs = {
    "enableTestingBanner": getFeatureFlagVal(process.env.ENABLE_TESTING_BANNER)
}

module.exports = {
    featureFlagConfigs
};
