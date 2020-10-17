const bre = require("@nomiclabs/buidler");
const { BigNumber } = require('@ethersproject/bignumber')

async function main() {
    const tokens = [
        '0xb5e5d0f8c0cba267cd3d7035d6adc8eba7df7cdd', //'DAI-MSTABLE'
        //'0x8a9447df1fb47209d36204e6d56767a33bf20f9f', // 'USDC-MSTABLE'
    ]



    const gasPrice = 100 * 1000000000


    const [deployer] = await ethers.getSigners();
    const signerAddress = await deployer.getAddress();
    console.log("Signer Address:", signerAddress);


    const ElDoradoSavingAccounts = await ethers.getContractFactory("ElDoradoSavingAccounts")
    const MStableProvider = await ethers.getContractFactory("MStableProvider")
    const erc20Factory = await ethers.getContractFactory("ERC20");
    const erc20 = erc20Factory.attach(tokens[0])


    const savingAccounts = await ElDoradoSavingAccounts.attach('0xb5885cF506A0dC37d07218BF2d648F7eB916dB23')
    // console.log('deploying')
    // const savingAccounts = await ElDoradoSavingAccounts.deploy({ gasPrice: gasPrice })
    // await savingAccounts.deployed()
    console.log('savingAccounts', savingAccounts.address)


    //const mstableProvider = await MStableProvider.attach('0x2a6D72a77ADb7ea5917caC048647d8D3a972005c')
    const mstableProvider = await MStableProvider.deploy(
        MAssetAddress, //MAsset, 
        "0x300e56938454A4d8005B2e84eefFca002B3a24Bc", //ISavingsContract
        "0x1c0de4e659e76d3c876813ff2ba9dc2da07ab658", //Helper
        {
            gasPrice: gasPrice
        }
    )    
    await mstableProvider.deployed()
    console.log('mstableProvider', mstableProvider.address)


    console.log('approving..')
    // TODO: IN a better way, and dynamic
    const approved = await erc20.approve(mstableProvider.address, '10000000000000000000000000000', { gasPrice: gasPrice })
 
    for (let i = 0; i < tokens.length; i++) {
        console.log('adding provider-token', tokens[i])
        const provider = await savingAccounts.addProvider(mstableProvider.address, tokens[i], { gasPrice: gasPrice, gasLimit: 200000 })
        await provider.wait()
    }

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

    console.log('depositOn')
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
