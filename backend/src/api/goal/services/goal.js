'use strict';

/**
 * goal service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::goal.goal');
