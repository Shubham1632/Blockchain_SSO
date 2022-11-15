// const { hardhatArguments } = require("hardhat");
require("dotenv").config();
require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-toolbox");

const rpcurl = process.env.rpc_url;
const goerliacc = process.env.private_key;
const coinmarket_api_key = process.env.coin_marketcap_key;
const local_provider = process.env.local_provider;
const local_key = process.env.local_key;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: rpcurl,
      accounts: [goerliacc],
      chainId: 5,
    },
    local: {
      url: local_provider,
      accounts: [local_key],
      chainId: 31337,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    coinmarketcap: coinmarket_api_key,
    token: "USD",
  },
};
