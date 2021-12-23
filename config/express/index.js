'use strict';

const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');

module.exports = (app) => {
  app.use(compress());
  app.use(cors());

  app.use((req, res, next) => {
    if (req.body && !req.is('json')) {
      return next(
        response.error400('invalid content-type, must be application/json')
      );
    }
    next();
  });

  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.use((req, res, next) => {
    const XML_CONTENT_TYPES = [
      'application/xml',
      'application/atom+xml',
      'application/rss+xml',
      'application/rdf+xml',
      'application/soap+xml',
      'application/xhtml+xml',
      'application/xml-dtd',
      'application/xop+xml',
      'text/xml',
      'message/imdn+xml',
      'image/svg+xml'
    ];
    if (XML_CONTENT_TYPES.includes(req.get('content-type'))) {
      return bodyParser.xml({
        xmlParseOptions: {
          explicitArray: false
        }
      })(req, res, next);
    }
    next();
  });

  require('../../app/controllers')(app);

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })

  // app.use((req, res, next) => {
  //   const err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });
}