require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");


module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: process.env.ARCHIVE_NODE_API,
      }
    },
  },
  paths: {
    deploy: 'deploy',
    deployments: 'deployments',
    tests: 'tests',
    scripts: 'scripts',
  },
  mocha: {
    timeout: 500000
  }
};
