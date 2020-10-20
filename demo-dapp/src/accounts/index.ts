import { BigNumber, ethers } from 'ethers'

import Portis from '@portis/web3';
import Web3 from 'web3';



import { ElDoradoSavingAccountsFactory } from '../assets/types/ElDoradoSavingAccountsFactory'
import { IElDoradoSavingsProviderFactory } from '../assets/types/IElDoradoSavingsProviderFactory';

import { Erc20DetailedFactory } from '../assets/types/Erc20DetailedFactory'
import { Erc20Factory, MStableProviderFactory } from '../assets/types';

const network = 'ropsten'

const portis = new Portis('89eb3ac5-6738-42b7-98c0-3e3ca4a39853', network);
const provider = new ethers.providers.Web3Provider(portis.provider)
const readonlyProvider = new ethers.providers.InfuraProvider('ropsten', 'b7f5cd5ebd97457fb6deac2856569177')
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


export async function transfer(tokenAddress: string, amount: BigNumber, recipient: string): Promise<void> {
    const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer)

    const tx = await erc20.transfer(recipient, amount)
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
    address: string
    name: string
    depositable: TokenData[]
    tokenizedName?: string
    providerTokenAPY?: TokenAPYData
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
    let tokenizedName: string | undefined = undefined
    try {
        tokenizedName = await getTokenName(providerAddress)
    } catch {

    }
    //const balance = await accounts.getBalance()

    return {
        id: id,
        name: name,
        depositable: depositable,
        address: providerAddress,
        tokenizedName: tokenizedName,
        //If it's a tokenized provider, then we put it here
        providerTokenAPY: tokenizedName ? await getTokenApy(providerAddress, name) : undefined
    }
}

export async function getAllProviders() {
    const addresses = await getProvidersAddressList();
    const providers = await Promise.all(addresses.map(getProviderData))
    return providers
}

export type TokenAPYData = {
    tokenAddress: string,
    apy: BigNumber
}

export async function getTokenApy(tokenAddress: string, providerName?: string): Promise<TokenAPYData | undefined> {
    //TODO: This applies only to mStable, we should implemented per provider
    var token = Erc20Factory.connect(tokenAddress, readonlyProvider)
    var mstable = MStableProviderFactory.connect(tokenAddress, readonlyProvider)
    //from mint
    const filter = token.filters.Transfer('0x0000000000000000000000000000000000000000', null, null)
    const toBlockNumber = await readonlyProvider.getBlockNumber();
    const events = await token.queryFilter(filter, 0, toBlockNumber)

    const tryGetRage = async (block: number)=>{
        try{
            return await mstable.exchangeRate({
                blockTag: block //8916576//x.blockNumber 
            })
        }
        catch{
            console.log('failed')
            return BigNumber.from('1')
        }
    }

    const blocks =
        await Promise.all(
            events
                .reduce((p, c, i) => {
                    if (p.findIndex(x => x.blockNumber == c.blockNumber) < 0)
                        p.push(c)
                    return p
                }, events.filter(() => false))
                .map(async x => (
                    {
                        block: await x.getBlock(),
                        rate: await tryGetRage(x.blockNumber)
                    }
                ))
        )



    //NOTE MSTABLE APY = ((amount now * 1e18 / amount then) - 1e18) * (secondsInYear / depositLengthInSeconds)
    //from docs: apy = ((1 + percentageRateChange)^(compoundIntervalCountPerYear)) - 1
    const points = blocks.map(x => {
        return {
            value: x.rate,
            timestamp: x.block.timestamp,
            apy: BigNumber.from('0')
        }
    })

    const e18 = BigNumber.from('1' + ''.padEnd(18, '0'))
    const secondsInYear = BigNumber.from('31556926')
    for (let i = 1; i < points.length; i++) {
        const left = points[i].value.mul(e18).div(points[i - 1].value).sub(e18)
        const right = secondsInYear.div(points[i - 1].timestamp - points[i].timestamp)
        points[i].apy = left.mul(right)
    }
    console.log(points)

    return {
        tokenAddress: tokenAddress,
        apy: points[points.length - 1].apy
    }
    return undefined
}