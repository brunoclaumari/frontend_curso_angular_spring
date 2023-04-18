const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://localhost:44357/',//'http://localhost:8080/' // url do spring
    secure: false,
    logLevel: 'debug'
    //pathRewrite: {'^/api' : ''}
  }
];
module.exports = PROXY_CONFIG;
