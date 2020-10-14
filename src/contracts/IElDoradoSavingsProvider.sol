//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

interface IElDoradoSavingsProvider {
  
    function deposit(address sender, address _tokenAddress, uint256 _amount) external returns(uint256);
    function withdraw(address sender, address _tokenAddress, uint256 _amount) external returns(uint256);
    function getBalance(address sender) external view returns(uint256);
    function getEarnings(address sender) external view returns(uint256);
    
    function approveToken(address _tokenAddress) external returns(bool);

    function getTotalDeposited() external view returns (uint256);

}
