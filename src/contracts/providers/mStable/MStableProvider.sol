//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@mstable/protocol/contracts/interfaces/IMasset.sol";
import "@mstable/protocol/contracts/interfaces/IMStableHelper.sol";
import "@mstable/protocol/contracts/interfaces/ISavingsContract.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../IElDoradoSavingsProvider.sol";

import "@nomiclabs/buidler/console.sol";

//NOTE APY = ((amount now * 1e18 / amount then) - 1e18) * (secondsInYear / depositLengthInSeconds)


contract MStableProvider 
    /*is IElDoradoSavingsProvider*/
     {

    IMasset private masset;
    ISavingsContract private savings;
    IERC20 private mUSD;
    IMStableHelper private helper;

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

    function approveToken(uint256 _tokenAddress) external returns(bool){
        //TODO: owner only

        IERC20 token = IERC20(_tokenAddress);
        token.approve(address(masset), uint256(-1));
        token.approve(address(savings), uint256(-1));
        mUSD.approve(address(savings), uint256(-1));
    }

    function deposit(
        address _tokenAddress,
        uint256 _amount
    ) external returns(uint256){
        //TODO: owner only
        //TODO Should not use sender but an from address
        require(_amount > 0, "Deposit amount must be greater than zero");
        
        IERC20 token = IERC20(_tokenAddress);

        uint256 balance = token.balanceOf(msg.sender);
        require(_amount <= balance , "Insufficient balance");

        // Temp transfer bAsset to this contract
        token.transferFrom(msg.sender, address(this), _amount);
        // mint basset to get masset
        uint256 massetsMinted = masset.mintTo(_tokenAddress, _amount, address(this));
        totalDeposited  += massetsMinted;
        // deposit masset
        savings.depositSavings(massetsMinted);

        //TODO: keep track of deposited amounts

        return massetsMinted;
    }

    function balanceOf() external view returns(uint256) {
       return helper.getSaveBalance(
            savings,
            address(this)
        );
    }

    function earntOf() external view returns(uint256) {
        uint256 balance = helper.getSaveBalance(savings,address(this));
        if(balance <= totalDeposited)
            return 0;
        return  balance - totalDeposited;
    }


    // Redeem + Swap back to basset
    function withdraw(
        address _tokenAddress,
        uint256 _amount //This is in mstable with lots of digits xC
    ) external returns(uint256){
        require(_amount > 0, "Must withdraw something");
        uint256 creditUnits =  helper.getSaveRedeemInput(savings, _amount);     
        uint256 massetReturned = savings.redeem(creditUnits);

        bool valid;
        string memory reason;
        uint256 bassetUnits;
        uint256 bassetQuantityArg;

        (valid, reason, bassetUnits,bassetQuantityArg) = helper.getRedeemValidity(address(masset), massetReturned, _tokenAddress);
        uint256 redeemed = masset.redeemTo(address(_tokenAddress), bassetQuantityArg, msg.sender);
        
        totalDeposited  -= massetReturned;
        return redeemed;
    }




    

    // AUXILIARY METHODS

    // From deposit to mAsset
    function redeemDeposit(uint256 _amount) external returns (uint256){
        require(_amount > 0, "Must redeem something");
        uint256 creditUnits =  helper.getSaveRedeemInput(
            savings,
            _amount
        );
        return savings.redeem(creditUnits);
    }

    //from M
    function redeemAssets( address _tokenAddress, uint256 _amount) external returns (uint256){
        require(_amount > 0, "Must redeem something");
        uint256 redeemed = masset.redeemTo(address(_tokenAddress), _amount, msg.sender);
        totalDeposited  -= _amount;
        return redeemed;
    }




    function exchangeRate() external view returns (uint256){
        return savings.exchangeRate();
    }

    function suggestMintAsset() external view returns(bool, string memory, address){
        return helper.suggestMintAsset(address(masset));
    }

    function getTotalDeposited() external view returns(uint256) {
        return totalDeposited;
    }
    // function creditBalances(address) external view returns (uint256);


}