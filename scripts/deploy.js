const hre = require("hardhat");
const owner = "0x1012432aE0043A58aEc074B5F7EE77EBa88caD9f";
const host = "0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6";
const cfa = "0xF4C5310E51F6079F601a5fb7120bC72a70b96e2A";
const ETHx = "0xa623b2DD931C5162b7a0B25852f4024Db48bb1A0";
const name = "Cash Cow Token";
const symbol = "CCT";
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  const TradeableCashflow = await hre.ethers.getContractFactory(
    "TradeableCashflow"
  );
  const tradeableCashflow = await TradeableCashflow.deploy(
    owner,
    name,
    symbol,
    host,
    cfa,
    ETHx
  );

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  await tradeableCashflow.deployed();
  console.log("Tradeable Cashflow deployed to", tradeableCashflow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
