require('dotenv').config();
const hre = require("hardhat");


async function forkAtBlock(block) {
  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [{
      forking: {
        jsonRpcUrl: process.env.ARCHIVE_NODE_API,
        blockNumber: block
      }
    }]
  })
  await hre.network.provider.request({
    method: "evm_setNextBlockTimestamp",
    params: [1704042223]}
  )
}

module.exports = {
  forkAtBlock,
}
