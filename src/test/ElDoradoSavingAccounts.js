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

  it("Should returns earnings from providers", async function () {
    const signers = await ethers.getSigners()
    const userAddress = await signers[0].getAddress()

    const mockProvider_1 = await getNewInstanceOf("MockProvider")
    const mockProvider_2 = await getNewInstanceOf("MockProvider")
    const savingAccounts = await getNewInstanceOf("ElDoradoSavingAccounts")
    const erc20_1 = await getNewInstanceOf("ERC20Mintable")
    const erc20_2 = await getNewInstanceOf("ERC20Mintable")

    await savingAccounts.addProvider(mockProvider_1.address, erc20_1.address);
    await savingAccounts.addProvider(mockProvider_2.address, erc20_2.address);

    await erc20_1.mint(userAddress, '100000000')
    await erc20_2.mint(userAddress, '100000000')

    expect(await savingAccounts.getEarnings()).to.equal('0');

    await savingAccounts.depositAt(erc20_1.address, '1000')
    await savingAccounts.depositAt(erc20_2.address, '2000')

    //SIMULATE TIME
    await mockProvider_1.simulate();

    expect(await savingAccounts.getEarnings()).to.gt('3000');


  })

});