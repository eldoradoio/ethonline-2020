import { BigNumber, ethers } from 'ethers'

import Portis from '@portis/web3';
import Web3 from 'web3';



import { ElDoradoSavingAccountsFactory } from '../assets/types/ElDoradoSavingAccountsFactory'
import { Erc20DetailedFactory } from '../assets/types/Erc20DetailedFactory'

const network = 'ropsten'

const portis = new Portis('89eb3ac5-6738-42b7-98c0-3e3ca4a39853', network);
const provider = new ethers.providers.Web3Provider(portis.provider)
const signer = provider.getSigner()


const accounts = ElDoradoSavingAccountsFactory.connect('0xc9E3E339f3FCe60fafD35aC6b73CEeE1A4D3Ba88', signer)


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
    const savingsProvider = await accounts.getProviderByToken(tokenAddress)

    return {
        balance: await erc20.balanceOf(address),
        decimals: await erc20.decimals(),
        allowance: await erc20.allowance(address, savingsProvider)
    }
}

export async function approve(tokenAddress: string): Promise<void> {
    try {
        const erc20 = Erc20DetailedFactory.connect(tokenAddress, provider)
        const savingsProvider = await accounts.getProviderByToken(tokenAddress)
        const tx = await erc20.approve(savingsProvider, BigNumber.from('2').pow('256').sub('1'))
        await tx.wait()
    }
    catch (e) {
        
    }
}


export async function deposit(tokenAddress: string, amount: BigNumber): Promise<void> {
    await accounts.depositOn(tokenAddress, amount, {
        gasLimit: 850000
    })
}

export type TokenBalance = {
    balance: BigNumber
    decimals: number
    allowance: BigNumber
}