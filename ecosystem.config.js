module.exports = {
  apps: [
    {
      name: 'storage',
      script: 'npm',
      args: 'run start',
      cwd: '/home/user/code/Satecma_Next',
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'your-ssh-username',                         // SSH username to access the server
      host: 'your-server-ip-or-domain.com',              // Your server's IP address or domain
      ref: 'origin/master',                              // Git branch to deploy from
      repo: 'git@github.com:yourusername/repository.git',// Git repository URL
      path: '/var/www/organizator.bg',                   // Deployment path on the server
      'pre-deploy-local': '',                            // Optional: Commands to run locally before deployment
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production', // Post-deployment steps
      'pre-setup': ''                                    // Optional: Commands to run before the setup
    }
  }
};
