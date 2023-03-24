module.exports = ({ env }) => ({
    sentry: {
      dsn: env('NODE_ENV') === 'development' ? null : env('SENTRY_DSN'),
      sendMetadata: true,
    },
  })