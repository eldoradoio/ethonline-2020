//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

interface IElDoradoSavingsProvider {
  
    function deposit(address account, address _tokenAddress, uint256 _amount) external returns(uint256);
    function withdraw(address account, address _tokenAddress, uint256 _amount) external returns(uint256);
    function getBalance(address account) external view returns(uint256);
    function getEarnings(address account) external view returns(uint256);
    
    function approveToken(address _tokenAddress) external returns(bool);

    function getTotalDeposited() external view returns (uint256);

}
