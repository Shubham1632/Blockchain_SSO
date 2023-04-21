const { soliditySha256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
require("dotenv").config();
const fs = require("fs");
const { getIndexedSignatureForEvent } = require("typechain");

const address = process.env.contractAddress;
const prov = process.env.ganacheProvider;
const local_key = process.env.ganachePrivateKey;

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
const userAddress = "0x63f384FB072079A8f878565e07B46f7b425eE6B5";

async function store() {
  const sso = await getContract();
  const newuser = await sso.createUser(
    username,
    email,
    pass,
    add,
    alterid,
    phone_no,
    userAddress
  );
  await newuser.wait(1);
  console.log(`The user is sucssesfully registerd`);
  const curruser = await sso.getUserNameByAddress(userAddress);
  console.log(`The registered user is : ${curruser}`);
}

store().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
