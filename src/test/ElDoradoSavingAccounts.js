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

  it("Should allow to list the providers", async function () {
    const savingAccounts = await getNewInstanceOf("ElDoradoSavingAccounts")

    const mockProvider_1 = await getNewInstanceOf("MockProvider")
    const mockProvider_2 = await getNewInstanceOf("MockProvider")

    const erc20_1 = await getNewInstanceOf("ERC20Mintable")
    const erc20_2 = await getNewInstanceOf("ERC20Mintable")

    expect(await savingAccounts.providersCount()).to.equal(0);

    await savingAccounts.addProvider(mockProvider_1.address, erc20_1.address);
    await savingAccounts.addProvider(mockProvider_2.address, erc20_2.address);

    expect(await savingAccounts.providersCount()).to.equal(2);

    expect((await savingAccounts.getProviderByIndex(0))).to.equal(mockProvider_1.address)
    expect((await savingAccounts.getProviderByIndex(1))).to.equal(mockProvider_2.address)

  });

  it("Should not duplicate providers", async function () {
    const savingAccounts = await getNewInstanceOf("ElDoradoSavingAccounts")

    const mockProvider_1 = await getNewInstanceOf("MockProvider")
    const mockProvider_2 = await getNewInstanceOf("MockProvider")

    const erc20_1 = await getNewInstanceOf("ERC20Mintable")
    const erc20_2 = await getNewInstanceOf("ERC20Mintable")


    expect(await savingAccounts.providersCount()).to.equal(0);

    await savingAccounts.addProvider(mockProvider_1.address, erc20_1.address);
    await savingAccounts.addProvider(mockProvider_2.address, erc20_2.address);
    await savingAccounts.addProvider(mockProvider_2.address, erc20_2.address);
    await savingAccounts.addProvider(mockProvider_1.address, erc20_1.address);
    await savingAccounts.addProvider(mockProvider_2.address, erc20_2.address);

    expect(await savingAccounts.providersCount()).to.equal(2);

  })


  it("Should allow anyone to deposit tokens on a specific provider", async function () {
    const signers = await ethers.getSigners()
    const userAddress = await signers[0].getAddress()

    const mockProvider = await getNewInstanceOf("MockProvider")
    const savingAccounts = await getNewInstanceOf("ElDoradoSavingAccounts")
    const erc20 = await getNewInstanceOf("ERC20Mintable")

    await erc20.mint(userAddress, '100000000')

    await savingAccounts.addProvider(mockProvider.address, erc20.address);

    expect(await savingAccounts.getBalance(erc20.address)).to.equal('0')

    await savingAccounts.depositOn(erc20.address, '100')
    expect(await savingAccounts.getBalance(erc20.address)).to.equal('100')

    await savingAccounts.depositOn(erc20.address, '150')
    expect(await savingAccounts.getBalance(erc20.address)).to.equal('250')

    expect((await mockProvider.getListOfDepositableTokens()).length).to.equal(1);
    expect((await mockProvider.getListOfWithdrawableTokens()).length).to.equal(1);

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

    expect(await savingAccounts.getEarnings(erc20_1.address)).to.equal('0');
    expect(await savingAccounts.getEarnings(erc20_2.address)).to.equal('0');

    await savingAccounts.depositOn(erc20_1.address, '1000')
    await savingAccounts.depositOn(erc20_2.address, '2000')

    //SIMULATE TIME
    await mockProvider_1.simulate();

    expect(await savingAccounts.getEarnings(erc20_1.address)).to.gt('1000');
    expect(await savingAccounts.getEarnings(erc20_2.address)).to.gt('2000');

    expect((await mockProvider_1.getListOfDepositableTokens()).length).to.equal(1);
    expect((await mockProvider_2.getListOfDepositableTokens()).length).to.equal(1);

  })

});