//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

interface IElDoradoSavingsProvider {
  
    function deposit(address _account, address _tokenAddress, uint256 _amount) external returns(uint256);
    function withdraw(address _account, address _tokenAddress, uint256 _amount) external returns(uint256);
    
    function getBalance(address _account, address _tokenAddress) external view returns(uint256);
    function getEarnings(address _account, address _tokenAddress) external view returns(uint256);
    function getDeposited(address _account, address _tokenAddress) external view returns (uint256);

    function approveToken(address _tokenAddress) external returns(bool);

    function getListOfDepositableTokens() external view returns(address[] memory);
    function getListOfWithdrawableTokens() external view returns(address[] memory);
   
}
