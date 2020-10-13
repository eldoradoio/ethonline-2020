const { expect } = require("chai");

async function getNewInstanceOf(contract) {
  const factory = await ethers.getContractFactory(contract)
  const instance = await factory.deploy();
  await instance.deployed();
  return instance;
}

describe("ElDoradoSavingAccounts", function () {
  it("Should allow owner to add a new provider", async function () {
    const savingAccounts = await getNewInstanceOf("ElDoradoSavingAccounts")
    const mockProvider = await getNewInstanceOf("MockProvider")
    const erc20 = await getNewInstanceOf("ERC20Mintable")

    expect(await savingAccounts.providersCount()).to.equal(0);

    await savingAccounts.addProvider(mockProvider.address, erc20.address);

    expect(await savingAccounts.providersCount()).to.equal(1);
  });

  it("Should allow anyone to deposit tokens on a specific provider", async function () {
    const signers = await ethers.getSigners()
    const userAddress = await signers[0].getAddress()

    const mockProvider = await getNewInstanceOf("MockProvider")
    const savingAccounts = await getNewInstanceOf("ElDoradoSavingAccounts")
    const erc20 = await getNewInstanceOf("ERC20Mintable")

    await erc20.mint(userAddress, '100000000')

    await savingAccounts.addProvider(mockProvider.address, erc20.address);

    expect(await savingAccounts.getBalance()).to.equal('0');

    await savingAccounts.depositAt(erc20.address, '100')
    expect(await savingAccounts.getBalance()).to.equal('100');

    await savingAccounts.depositAt(erc20.address, '150')
    expect(await savingAccounts.getBalance()).to.equal('250');

  })

});