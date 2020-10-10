//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@mstable/protocol/contracts/interfaces/IMasset.sol";
import "@mstable/protocol/contracts/interfaces/IMStableHelper.sol";
import "@mstable/protocol/contracts/interfaces/ISavingsContract.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../IElDoradoSavingsProvider.sol";

import "@nomiclabs/buidler/console.sol";

contract MStableProvider 
    /*is IElDoradoSavingsProvider*/
     {

    IMasset private masset;
    ISavingsContract private savings;
    IERC20 private mUSD;
    IMStableHelper private helper;

    uint256 private totalDepossited;

    constructor(
            address _masset, 
            ISavingsContract _savings,
            IMStableHelper _helper
    ) public {
        masset = IMasset(_masset);
        savings = _savings;
        mUSD = IERC20(_masset);
        helper = _helper;
        totalDepossited = 0;
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
        require(balance > _amount, "Insufficient balance");

        // Temp transfer bAsset to this contract
        token.transferFrom(msg.sender, address(this), _amount);
        // mint basset to get masset
        uint256 massetsMinted = masset.mintTo(_tokenAddress, _amount, address(this));
        totalDepossited = totalDepossited + massetsMinted;
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
        if(balance < totalDepossited)
            return 0;
        return  balance - totalDepossited;
    }


    function stop(
        address _tokenAddress,
        uint256 _amount
    ) external returns(uint256){
        uint256 creditUnits = _getSaveRedeemInput(_amount - 1);     
        uint256 massetReturned = savings.redeem(creditUnits);
        return massetReturned;
    }

    function withdraw(
        address _tokenAddress,
        uint256 _amount
    ) external returns(uint256){
        uint256 redeemed = masset.redeemTo(address(_tokenAddress), _amount, msg.sender);
        return redeemed;
    }


    function _getSaveRedeemInput(uint256 _amount) internal view returns(uint256){
       return  helper.getSaveRedeemInput(
            savings,
            _amount * 1000000000000  //TODO Diff from token and mstable digits????
        );
    }

    function getSaveRedeemInput(uint256 _amount) external view returns(uint256){
       return  _getSaveRedeemInput(_amount);
    }

    /* TODO: with the helper, we can call this and maybe swap to get that one?
    function suggestMintAsset(
            address _mAsset
        )
            external
            view
            returns (
                bool,
                string memory,
                address
            );


    */
}