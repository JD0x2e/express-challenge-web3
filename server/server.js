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

app.get("/people/:field/:search", (req, res) => {
  // const country = req.params.country || "Not a valid country!";
  let person = getPeople(req.params.field, req.params.search);
  res.status(200).json(person);
});

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
