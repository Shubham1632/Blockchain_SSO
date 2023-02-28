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

const username = "Shubham";
const password = "@shubham163";

async function validate() {
  const sso = await getContract();
  const pass = await sso.validate(username, password);
  if (pass) {
    console.log("you are validated");
  } else {
    console.log("you are not a validated user");
  }
}

validate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
