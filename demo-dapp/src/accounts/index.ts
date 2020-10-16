import { BigNumber, ethers } from 'ethers'

import { ElDoradoSavingAccounts } from '../assets/types/ElDoradoSavingAccounts'
import ElDoradoSavingAccountsArtifact from '../assets/artifacts/ElDoradoSavingAccounts.json'
import ERC20Artifact from '../assets/artifacts/ERC20.json'

const provider = ethers.getDefaultProvider('ropsten');
const accounts: ElDoradoSavingAccounts =
    new ethers.Contract('0x417558c27f04cee2ea740723773f12b5c6764534', ElDoradoSavingAccountsArtifact.abi, provider) as ElDoradoSavingAccounts;


export async function getBalance(): Promise<BigNumber> {
    const balance = await accounts.getBalance()
    console.log('balance', balance)
    //new ethers.(ElDoradoSavingAccountsArtifact, ).attach('')

    return balance
}

export async function getAccounts(): Promise<string[]> {
    return ['0xb5e5d0f8c0cba267cd3d7035d6adc8eba7df7cdd'] //these should come from the contract
}

export async function getTokenName(tokenAddress: string): Promise<string> {
    const erc20Contract = new ethers.Contract(tokenAddress, ERC20Artifact.abi, provider);
console.log(   erc20Contract.functions)
   return '';
}

export async function deposit(amount: BigNumber): Promise<void> {

}