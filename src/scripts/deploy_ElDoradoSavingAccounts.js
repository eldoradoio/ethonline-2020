const bre = require("@nomiclabs/buidler");
const { BigNumber } = require('@ethersproject/bignumber')

async function main() {
    const tokens = [
        '0xb5e5d0f8c0cba267cd3d7035d6adc8eba7df7cdd', //'DAI-MSTABLE'
        '0x8a9447df1fb47209d36204e6d56767a33bf20f9f', // 'USDC-MSTABLE'
        '0xb404c51bbc10dcbe948077f18a4b8e553d160084' //USDT MSTABLE
    ]
    const MAssetAddress = "0x4E1000616990D83e56f4b5fC6CC8602DcfD20459" //MAsset

    const gasPrice = 100 * 1000000000


    const [deployer] = await ethers.getSigners();
    const signerAddress = await deployer.getAddress();
    console.log("Signer Address:", signerAddress);


    const ElDoradoSavingAccounts = await ethers.getContractFactory("ElDoradoSavingAccounts")
    const IElDoradoSavingsProvider = await ethers.getContractFactory("IElDoradoSavingsProvider")
    const MStableProvider = await ethers.getContractFactory("MStableProvider")
    const erc20Factory = await ethers.getContractFactory("ERC20");
    const erc20 = erc20Factory.attach(tokens[0])


    const savingAccounts = await ElDoradoSavingAccounts.attach('0x6Fb4026895de9eB79044ecaCCEf99168B49cF13C')
    // console.log('deploying')
    // const savingAccounts = await ElDoradoSavingAccounts.deploy({ gasPrice: gasPrice })
    // await savingAccounts.deployed()
    // console.log('savingAccounts', savingAccounts.address)


    const mstableProvider = await MStableProvider.attach('0x32cd2dF6ed5C3DEFA3FC994Bf8E858F6Bb9fadEB')
    console.log('mstableProvider', mstableProvider.address)


    console.log('approving..')
    // TODO: Get provider list and do this
    const approved = await erc20.approve(mstableProvider.address, '10000000000000000000000000000', { gasPrice: gasPrice })
 
    for (let i = 0; i < tokens.length; i++) {
        console.log('adding provider-token', tokens[i])
        const provider = await savingAccounts.addProvider(mstableProvider.address, tokens[i], { gasPrice: gasPrice, gasLimit: 200000 })
        await provider.wait()
    }

    return;

    const printBalances = async () => {
        const tasks = [
            erc20.balanceOf(signerAddress),
            savingAccounts.getBalance(tokens[0])
        ]
        const [erc20Balance, savings] = await Promise.all(tasks)

        //console.clear();
        console.log('* User ERC20 balance', erc20Balance.toString())
        console.log('* Savings balance', savings.toString())
        
        //return earntOf
    }

    console.log('');     await printBalances();   console.log('');

    console.log('depositOn provider:')
    const providerAddress = await savingAccounts.getProviderByToken(tokens[0])
    const savingsProvider =  IElDoradoSavingsProvider.attach(providerAddress)
    console.log('Id', await savingsProvider.getProviderId())
    console.log('Name', await savingsProvider.getProviderName())
    console.log('Version', await savingsProvider.getProviderVersion())
   
    const deposit = await savingAccounts.depositOn(tokens[0], '10000000000000000', {
        gasLimit: '1000000',
        gasPrice: gasPrice
    })

    console.log(deposit.hash)

    await deposit.wait();

    console.log('');     await printBalances();   console.log('');

    console.log('withdrawOn')
    const balance = await savingAccounts.getBalance(tokens[0])
    const withdraw = await savingAccounts.withdrawOn(tokens[0], balance, {
        gasLimit: '1000000',
        gasPrice: gasPrice
    })
    await withdraw.wait();
    
    console.log('');     await printBalances();   console.log('');
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
