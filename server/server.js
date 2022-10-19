"use strict";

//node console
const ethers = require("ethers");
//using AlchemyProvider with shared project ID
const provider = new ethers.providers.AlchemyProvider("goerli");

//get current block number
const testFunction = async () => {
  const contractAddress = "0x3C78A502bbFDA122CAC4294cc24f4fc802A78810";
  const tokenAbi = require("../abi.json");
  const tokenContract = new ethers.Contract(contractAddress, tokenAbi, provider);
  const myName = await tokenContract.myName();

  return myName;
};

const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const peopleData = require("./data/people.json");
const app = express();

app.use(cors());

const getPeople = (field, search) => {
  const peopleObj = peopleData.filter((place) => place[field] === search);
  return peopleObj;
};

app.get("/", (req, res) => {
  res.send("Home route!");
});

app.get("/name", async (req, res) => {
  const myName = await testFunction();
  res.send(myName);
});

app.get("/token", async (req, res) => {
  const token = `<html><script>
    const tokenAddress = '0xD4e0a0e34cFe99966C79A49644a9F8bAd2d023D9';
    const tokenSymbol = 'DCT';
    const tokenDecimals = 18;
    const tokenImage = 'https://jamesbachini.com/misc/dct.jpeg?v=2';


    const dctToken = async () => {
      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logoy
          },
        },
      });
    }
</script>
<button onclick="dctToken()">Add token to wallet</button>
</html>`;
  res.send(token);
});

app.get("/people/:field/:search", (req, res) => {
  let person = getPeople(req.params.field, req.params.search);
  res.status(200).json(person);
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
