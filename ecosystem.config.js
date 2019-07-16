module.exports = {
  apps: [{
    name: 'carousel',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-130-208-95.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/FECCarousel.pem',
      ref: 'origin/master',
      repo: 'git@github.com:zbay-fec/Carousel.git',
      path: '/home/ubuntu/carousel',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ./ecosystem.config.js'
    }
  }
}