//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@nomiclabs/buidler/console.sol";

import "@openzeppelin/contracts/ownership/Ownable.sol";

import "@openzeppelin/contracts/utils/EnumerableSet.sol";
//import "@openzeppelin/contracts/utils/EnumerableMap.sol";

import "./IElDoradoSavingsProvider.sol";

contract ElDoradoSavingAccounts 
  //is Ownable 
  {

  using EnumerableSet for EnumerableSet.AddressSet;
  //using EnumerableMap for EnumerableMap.UintToAddressMap;
  
  EnumerableSet.AddressSet private _providers;
  mapping (address => address) private _token_provider;
  mapping (address => uint256)  private _balances;
  mapping (address => address)  private _accounts_providers;

  constructor() /*Ownable()*/ public {
    console.log("Deploying ElDoradoSavingsAccounts Contract");
  }



  function providersCount() public view returns (uint256) {
    return _providers.length();
  }

  function getProviderByIndex(uint256 index) public view returns (address) {
    return _providers.get(index);
  }

  function addProvider(address providerAddress, address _tokenAddress) public {
    // Callback for providers to implement internal erc20 approvals.
    IElDoradoSavingsProvider(providerAddress).approveToken(_tokenAddress);
    
    _token_provider[_tokenAddress] = providerAddress;
    _providers.add(providerAddress); 
  }


  function depositOn(uint256 _providerIndex, address _tokenAddress, uint256 _amount) public returns(uint256) {
      return _deposit(msg.sender, getProviderByIndex(_providerIndex), _tokenAddress, _amount);
  }

  function depositAt(address _tokenAddress, uint256 _amount) public returns(uint256) {
      return _deposit(msg.sender, _token_provider[_tokenAddress], _tokenAddress, _amount);
  }

  function getBalance() external view returns(uint256){
     return _balanceOf(msg.sender);
  }

  function balanceOf(address account) external view returns(uint256) {
    return _balanceOf(account);
  } 

  function _balanceOf(address account) private view returns(uint256) {
    return _balances[msg.sender];
  } 
  

  function getEarnings() external view returns(uint256){
    uint256 total = 0;
    for(uint256 i=0; i< _providers.length(); i++){
        total += IElDoradoSavingsProvider(_providers.get(i)).getEarnings(msg.sender);
    }
    return total;
  }

  function _deposit(address sender, address providerAddress, address _tokenAddress, uint256 _amount) private returns(uint256){
    // TODO: Check if valid provider
    // TODO: Check if valid erc20 token
      IElDoradoSavingsProvider(_providers.get(0)).getTotalDeposited();
      //uint256 result = IElDoradoSavingsProvider(providerAddress).deposit(sender, _tokenAddress, _amount);
      //_balances[sender] += result;
      //return result;
      return 0;
  }

  
}
