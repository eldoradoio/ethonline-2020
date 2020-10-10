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
  const MAssetAddress = "0x4E1000616990D83e56f4b5fC6CC8602DcfD20459" //MAsset
  const erc20Factory = await ethers.getContractFactory("IERC20");

  const erc20 = erc20Factory.attach(erc20Address)
  const mAsset = erc20Factory.attach(MAssetAddress)

  /**CONTRACT SETUP */
  const mstableProvider = await MStableProvider.deploy(
    MAssetAddress, //MAsset, 
    "0x300e56938454A4d8005B2e84eefFca002B3a24Bc", //ISavingsContract
    "0x1c0de4e659e76d3c876813ff2ba9dc2da07ab658" //Helper
  );

  //const mstableProvider = MStableProvider.attach("0xaB99E8c45Add0BdEbabeA95e75CCC2B85845f9ce")

  const mstableProviderAddress = mstableProvider.address;

  await mstableProvider.deployed();
  (await mstableProvider.approveToken(erc20Address)).wait();

  console.log("MStableProvider deployed to:", mstableProviderAddress);

  /**SENDER SETUP */

  const printBalances = async () => {
    console.log('Savings balance', (await mstableProvider.balanceOf()).toString());
    console.log('User ERC20 balance', (await erc20.balanceOf(signerAddress)).toString())
    console.log('PROVIDER mstable balance', (await mAsset.balanceOf(mstableProviderAddress)).toString())
  }

  await printBalances();

  console.log('')
  const allowance = await erc20.allowance(signerAddress, mstableProviderAddress);
  //console.log('allowance', allowance.toString())
  const approved = await erc20.approve(mstableProviderAddress, '20000000')
  await approved.wait()
  //console.log('allowance', (await erc20.allowance(signerAddress, mstableProviderAddress)).toString())

  const amount = '100'

  await printBalances();

  // /**ACTION */
  const result = await mstableProvider.deposit(erc20Address, amount, {
    gasLimit: 1000000,
    gasPrice: 20 * 1000000000
  })

  console.log('deposit hash', result.hash)
  await result.wait()

  await printBalances();


  /**
   * WITHDRAW
   */
  console.log('')
  console.log('Withdrawing')

  const withdrawResult = await mstableProvider.withdraw(
    erc20Address, // address _tokenAddress,
    amount, // uint256 _amount,
    {
      gasLimit: 1000000,
      gasPrice: 20 * 1000000000
    }
  )
  console.log('withdrawResult1', withdrawResult.hash)
  await withdrawResult.wait()


  /**
   * CHECKS
   */
  console.log('')

  await printBalances();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
