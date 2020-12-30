require('dotenv').config();
const hre = require("hardhat");
const loader = require("../helpers/loader.js");
const fs = require("fs");


describe("Curve", () => {
  it(`Get pool balances after block 11549953`, async () => {

    loader.forkAtBlock(11549953);

    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];

    const curve = JSON.parse(fs.readFileSync("constants/curve.json"));
    const curveRegistry = await new hre.ethers.Contract(curve.registry, curve.registry_abi, signer);

    const workingPools = [
      "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7",
      "0x4f062658EaAF2C1ccf8C8e36D6824CDf41167956",
      "0x8474DdbE98F5aA3179B3B3F5942D724aFcdec9f6",
      "0x4CA9b3063Ec5866A4B82E437059D2C43d1be596F",
      "0x3eF6A01A0f81D6046290f3e2A8c5b843e738E604",
      "0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56",
      "0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171",
      "0x93054188d876f558f4a66B2EF1d97d16eDf0895B",
      "0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714",
      "0xC18cC39da8b11dA8c3541C598eE022258F9744da",
      "0xC25099792E9349C7DD09759744ea681C7de2cb66",
      "0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb",
      "0xc5424B857f758E906013F3555Dad202e4bdB4567",
      "0x0f9cb53Ebe405d49A0bbdBD291A65Ff571bC83e1",
      "0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C",
      "0x8038C01A0390a8c547446a0b2c18fc9aEFEcc10c",
      "0x890f4e345B1dAED0367A877a1612f86A1f86985f",
      "0x071c661B4DeefB59E2a3DdB20Db036821eeE8F4b",
      "0x7F55DDe206dbAD629C080068923b36fe9D6bDBeF",
      "0xd81dA8D904b52208541Bade1bD6595D8a251F8dd",
      "0x0Ce6a5fF5217e38315f87032CF90686C96627CAA",
    ];

    const failingPools = [
      "0x06364f10B501e868329afBc005b3492902d6C763",
      "0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27",
      "0xA5407eAE9Ba41422680e2e00537571bcC53efBfD",
      "0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51",
      "0xDeBF20617708857ebe4F679508E7b7863a8A8EeE",
    ];

    console.log("The following pools work");
    await Promise.all(workingPools.map(async function (poolAddress) {
      const balances = await curveRegistry.get_balances(poolAddress);
      console.log("Pool balance", balances.toString())
    }));

    console.log("\nThe following pools will all fail");
    await Promise.all(failingPools.map(async function (poolAddress) {
      const balances = await curveRegistry.get_balances(poolAddress);
      console.log("Pool balance", balances.toString())
    }));
  });
});
