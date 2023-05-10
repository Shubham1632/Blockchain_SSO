const { soliditySha256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
require("dotenv").config();
const fs = require("fs");
const { getIndexedSignatureForEvent } = require("typechain");

const address = process.env.address;
const prov = process.env.sepolia_rpc_url;
const local_key = process.env.sepolia_private_key;

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

const username = "Shubham";
const email = "shubhamgangurde16@gamil.com";
const pass = "@shubham163";
const add = "nashik";
const alterid = "Shubham@16";
const phone_no = 9822701621;
const userAddress = "0x8F3eAb871D8Aaa6B6c0e20CcEEB3018a68ef34a3";

async function store() {
  const sso = await getContract();
  const newuser = await sso.createUser(username, email, pass, userAddress);
  await newuser.wait(1);
  console.log(`The user is sucssesfully registerd`);
}

store().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
