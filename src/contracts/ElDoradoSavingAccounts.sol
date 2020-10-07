//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.8;

import "@nomiclabs/buidler/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
//import "@openzeppelin/contracts/utils/EnumerableMap.sol";


contract ElDoradoSavingAccounts is Ownable {

  using EnumerableSet for EnumerableSet.AddressSet;
  //using EnumerableMap for EnumerableMap.UintToAddressMap;

  EnumerableSet.AddressSet private _providers;

  constructor() Ownable() public {
    console.log("Deploying ElDoradoSavingsAccounts Contract");
  }

  function providersCount() public view returns (uint256) {
    return _providers.length();
  }

  function getProvider(uint256 index) public view returns (address) {
    return _providers.at(index);
  }

  function addProvider(address providerAddress) public {
    // TODO: check if valid provider
    console.log("Adding provider at");
    _providers.add(providerAddress);  
  }
}
