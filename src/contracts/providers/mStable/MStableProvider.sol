//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@mstable/protocol/contracts/interfaces/IMasset.sol";
import "@mstable/protocol/contracts/interfaces/IMStableHelper.sol";
import "@mstable/protocol/contracts/interfaces/ISavingsContract.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

import "../../IElDoradoSavingsProvider.sol";

//NOTE APY = ((amount now * 1e18 / amount then) - 1e18) * (secondsInYear / depositLengthInSeconds)

contract MStableProvider is IElDoradoSavingsProvider  {
    
    using EnumerableSet for EnumerableSet.AddressSet;

    IMasset private masset;
    ISavingsContract private savings;
    IERC20 private mUSD;
    IMStableHelper private helper;
    
    EnumerableSet.AddressSet private _tokens;
    // User > balance
    mapping(address => uint256) private depositedBalances;
    // User > credits
    mapping(address => uint256) private creditBalances;

    uint256 private totalDeposited;

    constructor(
        address _masset,
        ISavingsContract _savings,
        IMStableHelper _helper
    ) public {
        masset = IMasset(_masset);
        savings = _savings;
        mUSD = IERC20(_masset);
        helper = _helper;
        totalDeposited = 0;
    }
    

    function approveToken(address _tokenAddress) external returns(bool) {
        //TODO: owner only

        IERC20 token = IERC20(_tokenAddress);
        token.approve(address(masset), uint256(-1));
        token.approve(address(savings), uint256(-1));
        mUSD.approve(address(savings), uint256(-1));

        _tokens.add(_tokenAddress);

        return true;
    }

    function deposit(address account, address _tokenAddress, uint256 _amount) external returns(uint256) {
        //TODO: owner only
        //TODO Should not use sender but an from address
        require(_amount > 0, "Deposit amount must be greater than zero");

        IERC20 token = IERC20(_tokenAddress);

        uint256 balance = token.balanceOf(account);
        require(_amount <= balance, "Insufficient balance");

        // Temp transfer bAsset to this contract
        token.transferFrom(account, address(this), _amount);
        // mint basset to get masset

        uint256 massetsMinted = masset.mintTo(
            _tokenAddress,
            _amount,
            address(this)
        );

        // deposit masset. We save the credits per account
        creditBalances[account] += savings.depositSavings(massetsMinted);
        depositedBalances[account] += massetsMinted;
        totalDeposited += massetsMinted;

        return massetsMinted;
    }

    function getBalance(address account, address _tokenAddress) external view returns(uint256) {
        // Notes from mStable person:
        // The amount of mUSD this user owns at any point in time can then be calculated as creditsIssued * exchangeRate / 1e18;
        return _getBalance(account);
    }

    function getDeposited(address account, address _tokenAddress) external view returns (uint256) {
        return _getDeposited(account);
    }

    function getEarnings(address account, address _tokenAddress) external view returns(uint256) {
        return _getEarnings(account);
    }


    // Redeem + Swap back to basset
    function withdraw(address account, address _tokenAddress, uint256 _amount) external returns(uint256) {
        require(_amount > 0, "Must withdraw something");
        // Get user credits
        uint256 creditUnits = helper.getSaveRedeemInput(savings, _amount);
        require(
            creditUnits <= creditBalances[account],
            "Cannot withdraw more than total in account"
        );

        // Credits to mAssset
        uint256 massetReturned = savings.redeem(creditUnits);

        bool valid;
        string memory reason;
        uint256 bassetUnits;
        uint256 bassetQuantityArg;
        // mAsset to bAsset
        (valid, reason, bassetUnits, bassetQuantityArg) = helper
            .getRedeemValidity(address(masset), massetReturned, _tokenAddress);
        uint256 redeemed = masset.redeemTo(
            address(_tokenAddress),
            bassetQuantityArg,
            account
        );

        // Recalcualte creditBalances
        creditBalances[account] -= creditUnits;
        depositedBalances[account] -= massetReturned;
        totalDeposited -= massetReturned;

        return redeemed;
    }

    function exchangeRate() external view returns (uint256) {
        return savings.exchangeRate();
    }

    function suggestMintAsset()
        external
        view
        returns (
            bool,
            string memory,
            address
        )
    {
        return helper.suggestMintAsset(address(masset));
    }

    function getTotalDeposited() external view returns (uint256){
        return totalDeposited;
    }

    function getTotalEarnings() external view returns (uint256) {
        uint256 balance = helper.getSaveBalance(savings, address(this));
        if (balance <= totalDeposited) return 0;
        return balance - totalDeposited;
    }

    function _getEarnings(address account) private view returns(uint256) {
        uint256 balance = _getBalance(account);
        uint256 deposited = _getDeposited(account);
        if (balance <= deposited) return 0;
        return balance - deposited;
    }

    function _getBalance(address account) private view returns(uint256) {
        // Notes from mStable person:
        // The amount of mUSD this user owns at any point in time can then be calculated as creditsIssued * exchangeRate / 1e18;
        return creditBalances[account] * savings.exchangeRate() / 1e18;
    }

    function _getDeposited(address account) private view returns(uint256) {
        return depositedBalances[account];
    }


    function getListOfDepositableTokens() external view returns(address[] memory){
        return _getTokens();
    }

    function getListOfWithdrawableTokens() external view returns(address[] memory){
        return _getTokens();
    }

    function _getTokens() private view returns (address[] memory) {
        uint256 size = _tokens.length();
        address[] memory result = new address[](size);
        for (uint256 i = 0; i < size; i++) {
            result[i] = _tokens.get(i);
        }
        return result;
    }
    // function creditBalances(address) external view returns (uint256);


    function getProviderId() external view returns (bytes32) {
        return keccak256('MSTABLE');
    }
    function getProviderVersion() external view returns (uint256){
        return 1;
    }
    function getProviderName() external view returns (string memory){
        return "mStable";
    }
}
