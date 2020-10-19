import { BigNumber, ethers } from 'ethers'

import Portis from '@portis/web3';
import Web3 from 'web3';



import { ElDoradoSavingAccountsFactory } from '../assets/types/ElDoradoSavingAccountsFactory'
import { IElDoradoSavingsProviderFactory } from '../assets/types/IElDoradoSavingsProviderFactory';

import { Erc20DetailedFactory } from '../assets/types/Erc20DetailedFactory'

const network = 'ropsten'

const portis = new Portis('89eb3ac5-6738-42b7-98c0-3e3ca4a39853', network);
const provider = new ethers.providers.Web3Provider(portis.provider)
const signer = provider.getSigner()


const accounts = ElDoradoSavingAccountsFactory.connect('0xD86637c69e1a207869062E954504cED0F17D6bFF', signer)

console.log('***********************************************************************************')
console.log('* USING EL DORADO SAVINGS ACCOUNT AT: ', accounts.address)
console.log('***********************************************************************************')

export async function getConnectedAddress(): Promise<string> {
    const address = await signer.getAddress()
    console.log(address)
    return address
}

export function getBalance(tokenAddress: string): Promise<BigNumber> {
    //getEarnings
    return accounts.getBalance(tokenAddress)
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

export async function getTokenSavingsBalance(tokenAddress: string): Promise<TokenBalance> {
    console.log('getting balance from', tokenAddress)
    const balance = await accounts.getBalance(tokenAddress)
    console.log('got balance from', tokenAddress, balance)
    return {
        balance: await balance,
        decimals: 18,
        allowance: BigNumber.from('1')
    }
}

export async function approve(tokenAddress: string): Promise<void> {
    const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer)
    const savingsProvider = await accounts.getProviderByToken(tokenAddress)
    const tx = await erc20.approve(savingsProvider, BigNumber.from('2').pow('256').sub('1'))
    await tx.wait()
}


export async function deposit(tokenAddress: string, amount: BigNumber): Promise<void> {
    const tx = await accounts.depositOn(tokenAddress, amount, {
        gasLimit: 850000
    })
    await tx.wait()
}


export async function withdraw(tokenAddress: string, amount: BigNumber): Promise<void> {
    console.log('withdrawing', amount)
    const tx = await accounts.withdrawOn(tokenAddress, amount, {
        gasLimit: 850000
    })
    await tx.wait()
}

function hex_to_ascii(str1: string) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}


export async function getTransactionResult(txHash: string) {
    const tx = await provider.getTransaction(txHash)
    let code = await provider.call(tx, tx.blockNumber)
    let reason = hex_to_ascii(code.substr(138))
    return reason
}

export type TokenBalance = {
    balance: BigNumber
    decimals: number
    allowance: BigNumber
}

export async function getProvidersAddressList() {
    const providersCount = await accounts.providersCount()
    const providersTasks = Array.from({ length: providersCount.toNumber() }, (x, i) => accounts.getProviderByIndex(i))
    const providerAddresses = await Promise.all(providersTasks)
    return providerAddresses
}

export type TokenData = { name: string, address: string }
export type ProviderData = {
    id: string
    //version: string
    name: string
    depositable: TokenData[]
}

export async function getProviderData(providerAddress: string): Promise<ProviderData> {
    const savingProvider = IElDoradoSavingsProviderFactory.connect(providerAddress, provider);
    const name = await savingProvider.getProviderName()
    const id = await savingProvider.getProviderId()
    const depositableAddresses = await savingProvider.getListOfDepositableTokens()
    const depositableNames = await Promise.all(depositableAddresses.map(getTokenName))
    const depositable = depositableAddresses
        .map((address, i) => ({
            name: depositableNames[i],
            address: address
        }))

    //const balance = await accounts.getBalance()

    return {
        id: id,
        name: name,
        depositable: depositable
    }
}

export async function getAllProviders() {
    const addresses = await getProvidersAddressList();
    const providers = await Promise.all(addresses.map(getProviderData))
    return providers
}