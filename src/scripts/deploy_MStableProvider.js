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
  // TODO: make this test with multiple users/accounts

  const fromExp = (bn, from, to) => {
    if (from > to)
      return BigNumber.from(bn).div(BigNumber.from(10).pow(from - to))
    else if (to > from)
      return BigNumber.from(bn).mul(BigNumber.from(10).pow(to - from))
    else
      return bnBigNumber.from(bn)
  }

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

  /*
  * CONTRACT SETUP
  */
  console.log('Deploying...')
  const mstableProvider = await MStableProvider.deploy(
    MAssetAddress, //MAsset, 
    "0x300e56938454A4d8005B2e84eefFca002B3a24Bc", //ISavingsContract
    "0x1c0de4e659e76d3c876813ff2ba9dc2da07ab658", //Helper
    {
      gasPrice: gasPrice
    }
  );

  //const mstableProvider = MStableProvider.attach("0x83E286Ce4C577C421a19fb078FDC9EA29415Ef68")

  const mstableProviderAddress = mstableProvider.address;

  await mstableProvider.deployed();
  //TODO Check for alloance to reduce gas usage
  (await mstableProvider.approveToken(erc20Address, { gasPrice: gasPrice })).wait();

  console.log("MStableProvider deployed to:", mstableProviderAddress);

  console.log('suggestMintAsset', (await mstableProvider.suggestMintAsset()));

  /**SENDER SETUP */

  const printBalances = async () => {
    const tasks = [
      mstableProvider.getBalance(signerAddress),
      mstableProvider.getEarnings(signerAddress),
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
  await printBalances();
  console.log('')


  /*
  * AMOUNT TO PLAY WITH
  */
  const ercBalance = await erc20.balanceOf(signerAddress)
  const amount = ercBalance
  console.log('Amount', amount.toString())

  if (amount > 0) {
    const allowance = await erc20.allowance(signerAddress, mstableProviderAddress);
    console.log('allowance', allowance.toString())

    if (allowance.lt(amount)) {
      console.log('Increasing allowance to', amount.toString())
      const approved = await erc20.approve(mstableProviderAddress, amount.mul('10'), { gasPrice: gasPrice })
      console.log('Increased allowance hash', approved.hash)
      await approved.wait()
    }


    /*
    * DEPOSIT 
    */
    console.log(''); console.log('Depositing')
    const result = await mstableProvider.deposit(signerAddress, erc20Address, amount, {
      gasLimit: 1000000,
      gasPrice: gasPrice
    })

    console.log('deposit hash', result.hash)
    await result.wait()
  }

  for (let i = 0; i < 1; i++) {
    console.log('Pass', i)
    const interestEarnt = await printBalances();
    if (interestEarnt.gt('0')) {
      console.log('Got some!', interestEarnt.toString())
    }

    await delay();
  }


  /**
   * WITHDRAW
   */


  if (false) {
    // // If we have (for any reason mstable in the contract, we need to split the process)
    // const redeemAmount = await mstableProvider.getBalance()
    // console.log('')
    // await printBalances();
    // console.log('')

    // console.log('redeemAmount', redeemAmount.toString())
    // if (redeemAmount.gt('0')) {
    //   console.log('Redeeming deposit to mstable')
    //   const redeemResult = await mstableProvider.redeemDeposit(redeemAmount, { gasPrice: gasPrice, gasLimit: 250000 })
    //   console.log(redeemResult.value.toString())
    //   await redeemResult.wait()
    // }

    // // 19999679999999999999998
    // const amountToBurn = fromExp(await mAsset.balanceOf(mstableProviderAddress), 18, 6)
    // console.log('Burning mstable to get baset', amountToBurn.toString())

    // const redeemAssetsResult = await mstableProvider.redeemAssets(erc20Address, amountToBurn, { gasPrice: gasPrice, gasLimit: 500000 })
    // console.log(redeemAssetsResult.value.toString())
    // await redeemAssetsResult.wait()
  }
  else {
    const withdrawAmount = await mstableProvider.getBalance(signerAddress)
    console.log('Withdrawing', withdrawAmount.toString())


    // this is design to take the same amount of digits, and totaldeposited is in mstable
    const withdrawResult = await mstableProvider.withdraw(
      signerAddress,
      erc20Address, // address _tokenAddress,
      withdrawAmount, // uint256 _amount,
      {
        gasLimit: 1000000,
        gasPrice: gasPrice
      }
    )
    console.log('withdrawResult1', withdrawResult.hash)
    await withdrawResult.wait()
  }


  /**
   * CHECKS
   */
  console.log('')

  await printBalances();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    if (error.transactionHash)
      console.error(error.transactionHash)
    else
      console.error(error);
    process.exit(1);
  });
