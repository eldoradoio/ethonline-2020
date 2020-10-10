//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@nomiclabs/buidler/console.sol";

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
//import "@openzeppelin/contracts/utils/EnumerableMap.sol";

import "./IElDoradoSavingsProvider.sol";

contract ElDoradoSavingAccounts is Ownable {

  using EnumerableSet for EnumerableSet.AddressSet;
  //using EnumerableMap for EnumerableMap.UintToAddressMap;

  EnumerableSet.AddressSet private _providers;

  //cos mstable is not on >=0.6
  //EnumerableMap.UintToAddressMap private _accounts;

  constructor() Ownable() public {
    console.log("Deploying ElDoradoSavingsAccounts Contract");
  }



  function providersCount() public view returns (uint256) {
    return _providers.length();
  }

  function getProvider(uint256 index) public view returns (address) {

    return _providers 
        //.at // Change this to at when  migrating to 0.6
        .get
        (index);
  }

  function addProvider(address providerAddress) public {
    // TODO: check if valid provider
    console.log("Adding provider at");
    _providers.add(providerAddress);  
  }


  function deposit(uint256 providerIndex, uint256 amount ) public {
      IElDoradoSavingsProvider(getProvider(providerIndex)).deposit();
  }


}
