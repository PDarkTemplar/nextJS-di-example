/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
    webpack(config) {
        config.resolve.alias['common-components'] = path.join(__dirname, 'src/components');
        config.resolve.alias['global-styles'] = path.join(__dirname, 'src/styles');
        config.resolve.alias['global-types'] = path.join(__dirname, 'src/types');
        config.resolve.alias.stores = path.join(__dirname, 'src/stores');
        config.resolve.alias.services = path.join(__dirname, 'src/services');
        config.resolve.alias['main-scene'] = path.join(__dirname, 'src/scenes/Main');
        return config;
    }
};