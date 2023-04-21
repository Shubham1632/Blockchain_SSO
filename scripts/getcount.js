const { soliditySha256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
require("dotenv").config();
const fs = require("fs");

const address = process.env.contractAddress;
const prov = process.env.ganacheProvider;

async function getContract() {
  const data = await fs.promises.readFile(
    "artifacts/contracts/sso.sol/sso.json",
    "utf8"
  );
  const abi = JSON.parse(data)["abi"];
  const provider = ethers.getDefaultProvider(prov);
  const sso = new ethers.Contract(address, abi, provider);
  return sso;
}

async function getcount() {
  const contract = await getContract();
  const totaluser = await contract.getusercount();
  console.log(`${totaluser} total`);
}

getcount().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
