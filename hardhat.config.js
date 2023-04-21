require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const ganacheProvider = process.env.ganacheProvider;
const ganachePrivateKey = process.env.ganachePrivateKey;

module.exports = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: ganacheProvider,
      accounts: [ganachePrivateKey],
      chainId: 1337,
    },
  },
};
