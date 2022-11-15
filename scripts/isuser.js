const { soliditySha256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
require("dotenv").config();
const fs = require("fs");

const address = process.env.address;
const prov = process.env.local_provider;

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

async function user() {
  const sso = await getContract();
  const isp = await sso.isuser("suda");
  if (isp) console.log("present");
  else console.log("not present");
}

user().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
