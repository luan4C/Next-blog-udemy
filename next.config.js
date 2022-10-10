/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = (phase) => {
  if(phase === PHASE_DEVELOPMENT_SERVER){
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: 'nextUser',
        mongodb_password:'AE639639639',
        mongodb_cluster_name:'cluster0',
        mongodb_database:'test'
      }
  }
}
  else {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: 'nextUser',
        mongodb_password:'AE639639639',
        mongodb_cluster_name:'cluster0',
        mongodb_database:'next-blog'
      }
  }
} 
}

module.exports = nextConfig
