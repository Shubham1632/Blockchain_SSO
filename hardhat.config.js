// const { hardhatArguments } = require("hardhat");
require("dotenv").config();
require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-toolbox");

const rpcurl = process.env.rpc_url;
const goerliacc = process.env.private_key;
const coinmarket_api_key = process.env.coin_marketcap_key;
const local_provider = process.env.local_provider;
const local_key = process.env.local_key;
const sepolia_rpc_url = process.env.sepolia_rpc_url;
const sepolia_private_key = process.env.sepolia_private_key;
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
    ganache: {
      url: local_provider,
      accounts: [local_key],
      chainId: 1337,
    },
    sepolia: {
      url: sepolia_rpc_url,
      accounts: [sepolia_private_key],
      chainId: 11155111,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "INR",
    coinmarketcap: coinmarket_api_key,
    token: "MATIC",
  },
};
