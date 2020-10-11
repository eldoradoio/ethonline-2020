// We require the Buidler Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `buidler run <script>` you'll find the Buidler
// Runtime Environment's members available in the global scope.
const bre = require("@nomiclabs/buidler");
const { BigNumber } = require('@ethersproject/bignumber')
const erc20WithDecimalsAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

function delay(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, (seconds || 1) * 1000)
  })
}

async function main() {

  const fromExp = (bn, exp) => BigNumber.from(bn).mul(BigNumber.from(10).pow(exp))

  const gasPrice = 100 * 1000000000;

  const [deployer] = await ethers.getSigners();

  const signerAddress = await deployer.getAddress();
  console.log(
    "Signer Address:",
    signerAddress
  );

  console.log("Account ETH balance:", ((await deployer.getBalance()).div('100000000000000').toNumber() / 10000).toFixed(4));

  const MStableProvider = await ethers.getContractFactory("MStableProvider");

  const erc20Address = '0xB404c51BBC10dcBE948077F18a4B8E553D160084' //USDT-MS
  const MAssetAddress = "0x4E1000616990D83e56f4b5fC6CC8602DcfD20459" //MAsset

  const erc20Factory = await ethers.getContractFactory("ERC20");
  const erc20 = erc20Factory.attach(erc20Address)
  const erc20WithDecimals = new ethers.Contract(erc20Address, erc20WithDecimalsAbi, deployer);

  const erc20Digits = await erc20WithDecimals.decimals() // OZ's IERC20 v2 does not support decimals (＃°Д°)
  console.log('erc20Digits', erc20Digits)

  const mAsset = erc20Factory.attach(MAssetAddress)

  /**CONTRACT SETUP */
  // console.log('Deploying...')
  // const mstableProvider = await MStableProvider.deploy(
  //   MAssetAddress, //MAsset, 
  //   "0x300e56938454A4d8005B2e84eefFca002B3a24Bc", //ISavingsContract
  //   "0x1c0de4e659e76d3c876813ff2ba9dc2da07ab658", //Helper
  //   {
  //     gasLimit: 1300000,
  //     gasPrice: gasPrice
  //   }
  // );

  const mstableProvider = MStableProvider.attach("0x70223c2F16336ddbE47a91C490100c0A5ba56704")

  const mstableProviderAddress = mstableProvider.address;

  await mstableProvider.deployed();
  (await mstableProvider.approveToken(erc20Address, { gasPrice: gasPrice })).wait();

  console.log("MStableProvider deployed to:", mstableProviderAddress);

  console.log('suggestMintAsset', (await mstableProvider.suggestMintAsset()));

  /**SENDER SETUP */

  const printBalances = async () => {
    const tasks = [
      mstableProvider.balanceOf(),
      mstableProvider.earntOf(),
      erc20.balanceOf(signerAddress),
      mAsset.balanceOf(mstableProviderAddress),
      mstableProvider.exchangeRate(),
      mstableProvider.getTotalDeposited()
    ]
    const [savings, earntOf, erc20Balance, mAssets, exchangeRate, getTotalDeposited] = await Promise.all(tasks)

    //console.clear();
    console.log('* Savings balance', savings.toString());
    console.log('* Earnt balance', earntOf.toString());
    console.log('* User ERC20 balance', erc20Balance.toString())
    console.log('* Provider mStable balance', mAssets.toString())
    console.log('* Exchange rate', exchangeRate.toString())
    console.log('* Total Deposited', getTotalDeposited.toString())
    return earntOf
  }

  console.log('')

  /*
  * AMOUNT TO PLAY WITH
  */
  const ercBalance = await erc20.balanceOf(signerAddress)
  const amount = ercBalance //fromExp(20000, erc20Digits)
  console.log('amount', amount.toString())

  if (amount > 0) {
    const allowance = await erc20.allowance(signerAddress, mstableProviderAddress);
    console.log('allowance', allowance.toString())
    if (allowance.lt(amount)) {
      console.log('Increasing allowance to', amount.toString())
      const approved = await erc20.approve(mstableProviderAddress, amount, { gasPrice: gasPrice })
      console.log('Increased allowance hash', approved.hash)
      await approved.wait()
    }


    /*
    * DEPOSIT 
    */
    console.log(''); console.log('Depositing')
    const result = await mstableProvider.deposit(erc20Address, amount, {
      gasLimit: 1000000,
      gasPrice: gasPrice
    })

    console.log('deposit hash', result.hash)
    await result.wait()
    console.log('getSaveRedeemInput', (await mstableProvider.getSaveRedeemInput(amount)).toString());
  }

  for (let i = 0; i < 60; i++) {
    console.log('Pass', i)
    const interestEarnt = await printBalances();
    if (interestEarnt.gt('0')) {
      console.log('Got some!', interestEarnt.toString())
    }
    else {
      await delay(60);
    }
  }


  /**
   * WITHDRAW
   */
  console.log('')
  await printBalances();
  console.log('')
  const withdrawAmount = await mstableProvider.getTotalDeposited()
  console.log('Withdrawing', withdrawAmount.toString())
 
  const withdrawResult = await mstableProvider.withdraw(
    erc20Address, // address _tokenAddress,
    withdrawAmount, // uint256 _amount,
    {
      gasLimit: 1000000,
      gasPrice: gasPrice
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
