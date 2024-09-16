const main = async () => {
  const Transactions_Master = await hre.ethers.getContractFactory("Transactions_Master");
  const transactions_Master = await Transactions_Master.deploy();

  await transactions_Master.deployed();

  console.log("Transactions_Master deployed to:", transactions_Master.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();

