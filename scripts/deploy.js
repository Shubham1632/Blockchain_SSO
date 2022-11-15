// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function sso() {
  const ssofactory = await ethers.getContractFactory("sso");
  const sso = await ssofactory.deploy();

  await sso.deployed();

  // const info = await sso.address;
  console.log(`contract deployed to :${sso.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
sso().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
