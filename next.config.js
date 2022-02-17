module.exports = {
  // experimental: {
  //   async headers() {
  //     return [
  //       {
  //         source: '/(.*)?',
  //         headers: [
  //           {
  //             key: 'Access-Control-Allow-Origin',
  //             value: '*'
  //           },
  //           {
  //             key: 'Access-Control-Allow-Methods',
  //             value: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  //           },
  //         ]
  //       }
  //     ]
  //   }
  // },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ["cdn.chec.io"],
  },
  target: 'serverless'
};
