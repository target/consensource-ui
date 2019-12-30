const { featureFlagConfigs } = require('App/config')

const isTestBannerEnabled = () => featureFlagConfigs.enableTestingBanner

module.exports = {
    isTestBannerEnabled
}
