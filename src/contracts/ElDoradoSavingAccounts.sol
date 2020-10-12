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
  
  mapping (address => address) private _token_provider;
  EnumerableSet.AddressSet private _providers;

  //cos mstable is not on >=0.6
  //EnumerableMap.UintToAddressMap private _accounts;

  constructor() Ownable() public {
    console.log("Deploying ElDoradoSavingsAccounts Contract");
  }



  function providersCount() public view returns (uint256) {
    return _providers.length();
  }

  function getProviderByIndex(uint256 index) public view returns (address) {

    return _providers 
        .get //.at // Change this to at when  migrating to 0.6
        (index);
  }

  function addProvider(address providerAddress, address _tokenAddress) public {
    // TODO: check if valid provider
    _token_provider[_tokenAddress] = providerAddress;
    _providers.add(providerAddress);  
  }


  function depositOn(uint256 _providerIndex, address _tokenAddress, uint256 _amount) public {
      IElDoradoSavingsProvider(getProviderByIndex(_providerIndex)).deposit(_tokenAddress, _amount);
  }

  function depositAt(address _tokenAddress, uint256 _amount) public {
      IElDoradoSavingsProvider(_token_provider[_tokenAddress]).deposit(_tokenAddress, _amount);
  }


}
