// We require the Buidler Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `buidler run <script>` you'll find the Buidler
// Runtime Environment's members available in the global scope.
const bre = require("@nomiclabs/buidler");

async function main() {
  const [deployer] = await ethers.getSigners();

  const signerAddress = await deployer.getAddress();
  console.log(
    "Deploying contracts with the account:",
    signerAddress
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());


  const MStableProvider = await ethers.getContractFactory("MStableProvider");
  const erc20Address = '0xB404c51BBC10dcBE948077F18a4B8E553D160084'
  const erc20Factory = await ethers.getContractFactory("IERC20");

  const erc20 = erc20Factory.attach(erc20Address)

  /**CONTRACT SETUP */
  const mstableProvider = await MStableProvider.deploy(
    "0x4E1000616990D83e56f4b5fC6CC8602DcfD20459", //IMasset _masset, 
    "0x300e56938454A4d8005B2e84eefFca002B3a24Bc" //ISavingsContract _savings
  );

  // const deployedAt = "0x9C33B3043EAabcb3932D93BA6471E8B47DC8d578"
  // const mstableProvider = MStableProvider.attach(deployedAt)

  await mstableProvider.deployed();
  await mstableProvider.approveToken(erc20Address);
  
  console.log("MStableProvider deployed to:", mstableProvider.address);


  /**SENDER SETUP */

  console.log('ERC20 balance', (await erc20.balanceOf(signerAddress)).toString())
  const allowance = await erc20.allowance(signerAddress, mstableProvider.address);
  console.log('allowance', allowance.toString())
  const approved = await erc20.approve(mstableProvider.address, '20000000')
  await approved.wait()
  console.log('allowance', (await erc20.allowance(signerAddress, mstableProvider.address)).toString() )
  

  /**ACTION */
  const result = await mstableProvider.deposit(erc20Address, '1000000', {
    gasLimit: 1000000,
    gasPrice: 50 * 1000000000
  })

  console.log('deposit hash', result.hash)

  await result.wait()




}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
