//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

interface IElDoradoSavingsProvider {
  
    function deposit(address _tokenAddress, uint256 _amount) external view returns(uint256);
    function withdraw(address _tokenAddress, uint256 _amount) external returns(uint256);
    function getBalance() external view returns(uint256);
    function getEarnings() external view returns(uint256);

}
