# Blockchain SSO

This project demonstrate the Single Sign On using the blockchain. it workes as a decentralized auth which autheticate the user without storing their data in a decentralized server.

This project is entirely made on hardhat. has one smart contract called sso which has all the nessesary functions that are required for authentication. has 4-5 scripts including a deployment script. hardhat-gas-reporter is already implemented. will reqire to add the specific packages to run the application at other end. 

To Use the project at your end:
1. intialize a folder and an empty local git repository
2. fork the project to your local repository
3. run yarn/npx hardhat node to get all the account
4. make a .env file and specify the rpc_url and your accounts private id's there
5. to run on goerli testnet add your own private key and node end-point (from alkemy)
6. to compile the smart contract you can use 
```shell
yarn hardhat compile
```
7. to deploy the script on local node
```shell
yarn hardhat run scripts/deploy.js
```


## Open for all kind of contributions


Try running some of the following tasks: (can use yarn/npx) 
> i used YARN in project

```shell
npx hardhat help
npx hardhat test 
npx hardhat node
npx hardhat run scripts/deploy.js
npx hardhat run scripts/store.js
npx hardhat run scripts/validate.js
npx hardhat run scripts/getcount.js
```
