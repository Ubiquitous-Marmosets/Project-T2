const cluster = require('cluster');
const fb = require('./fb.service');

if (cluster.isMaster) {
  const app = require('./server');

  console.log('loading initial facebook data.. please wait');
  fb.run().then(() => {
    console.log('facebook data loaded, rock on');
    app.listen(3000, function (req, res) {
      console.log('server is listening on 3000');
    });
  });

  let facebookScraper = null;
  setInterval(() => {
    if (!facebookScraper) {
      facebookScraper = cluster.fork();
      facebookScraper.on('exit', () => {
        facebookScraper = null;
      })
    }
  }, 1000*60*5)
} else {
  fb.run().then(() => {
    cluster.worker.kill();
  });
}
