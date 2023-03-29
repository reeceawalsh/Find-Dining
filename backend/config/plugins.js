module.exports = ({ env }) => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },
  "import-export-entries": {
    enabled: true,
  },
  // email: {
  //   config: {
  //     provider: "sendmail",
  //     settings: {
  //       defaultFrom: "find-dining-no-reply@hotmail.com",
  //       defaultReplyTo: "find-dining-no-reply@hotmail.com",
  //     },
  //   },
  // },
});
