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

const username = "Samartha";

async function user() {
  const sso = await getContract();
  const isp = await sso.isuser(username);
  if (isp)
    console.log(`Yes , the username ${username} is present in our system`);
  else console.log(`No, the username ${username} is not present in our system`);
}

user().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
