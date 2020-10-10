//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@mstable/protocol/contracts/interfaces/IMasset.sol";
import "@mstable/protocol/contracts/interfaces/ISavingsContract.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../../IElDoradoSavingsProvider.sol";

import "@nomiclabs/buidler/console.sol";

contract MStableProvider 
    /*is IElDoradoSavingsProvider*/
     {

    IMasset masset;
    ISavingsContract savings;
    bool isInit = false;

    constructor(IMasset _masset, ISavingsContract _savings) public {
        masset = _masset;
        savings = _savings;
    }    

    function approveToken(uint256 _tokenAddress) external returns(bool){
        //TODO: owner only

        IERC20 token = IERC20(_tokenAddress);
        token.approve(address(masset), uint256(-1));
        token.approve(address(savings), uint256(-1));
        isInit = true;
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

        // uint256 allowance = token.allowance(msg.sender, address(this));
        // if(allowance < _amount){
        //     console.log("Increasing allowance from %s to %s", allowance, _amount);
        //     token.approve(msg.sender, _amount); //safeApprove?
        // }

        token.transferFrom(msg.sender, address(this), _amount);
        
        uint256 massetsMinted = masset.mintTo(_tokenAddress, _amount, address(this));

        savings.depositSavings(massetsMinted);

        return massetsMinted;
    }

    // function withdraw(
    //     address _tokenAddress,
    //     uint256 _amount
    // ){

    // }


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