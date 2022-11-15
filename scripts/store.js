const { soliditySha256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
require("dotenv").config();
const fs = require("fs");

const address = process.env.address;
const prov = process.env.local_provider;
const local_key = process.env.local_key;

async function getContract() {
  const data = await fs.promises.readFile(
    "artifacts/contracts/sso.sol/sso.json",
    "utf8"
  );
  const abi = JSON.parse(data)["abi"];
  const provider = ethers.getDefaultProvider(prov);
  const signer = new ethers.Wallet(local_key, provider);
  const sso = new ethers.Contract(address, abi, signer);
  return sso;
}

async function store() {
  const sso = await getContract();
  const newuser = await sso.createUser(
    "shubham",
    "@gamil.com",
    "@shubham",
    "nashik",
    "@16",
    49820
  );
  await newuser.wait(1);
  // console.log(`the value stored at ${newuser.address}`);
}

store().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
