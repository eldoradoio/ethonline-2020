import { BigNumber, ethers } from 'ethers'

import Portis from '@portis/web3';
import Web3 from 'web3';



import { ElDoradoSavingAccountsFactory } from '../assets/types/ElDoradoSavingAccountsFactory'
import { Erc20DetailedFactory } from '../assets/types/Erc20DetailedFactory'

const network = 'ropsten'

const portis = new Portis('89eb3ac5-6738-42b7-98c0-3e3ca4a39853', network);
const provider = new ethers.providers.Web3Provider(portis.provider)
const signer = provider.getSigner()


const accounts = ElDoradoSavingAccountsFactory.connect('0x417558c27f04cee2ea740723773f12b5c6764534', signer)


export async function getConnectedAddress(): Promise<string> {
    return await signer.getAddress()
}

export function getBalance(): Promise<BigNumber> {
    return accounts.getBalance()
}

export async function getAccounts(): Promise<string[]> {
    return ['0xb5e5d0f8c0cba267cd3d7035d6adc8eba7df7cdd'] //these should come from the contract
}

export async function getTokenName(tokenAddress: string): Promise<string> {
    const erc20 = Erc20DetailedFactory.connect(tokenAddress, provider)
    return await erc20.name()
}

export async function getTokenBalance(tokenAddress: string): Promise<TokenBalance> {
    const erc20 = Erc20DetailedFactory.connect(tokenAddress, provider)
    const address = await getConnectedAddress()
    return {
        balance: await erc20.balanceOf(address),
        decimals: await erc20.decimals()
    }
}


export async function deposit(tokenAddress:string, amount: BigNumber): Promise<void> {
    await accounts.depositOn(tokenAddress, amount, {
        gasLimit: 850000
    })
}

export type TokenBalance = {
    balance: BigNumber,
    decimals: number
}