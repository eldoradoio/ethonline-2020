//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

interface IElDoradoSavingsProvider {

    function getProviderId() external view returns (bytes32);
    function getProviderVersion() external view returns (uint256);
    function getProviderName() external view returns (string memory);
  
    function deposit(address _account, address _tokenAddress, uint256 _amount) external returns(uint256);
    function withdraw(address _account, address _tokenAddress, uint256 _amount) external returns(uint256);
    
    function getBalance(address _account, address _tokenAddress) external view returns(uint256);
    function getEarnings(address _account, address _tokenAddress) external view returns(uint256);
    function getDeposited(address _account, address _tokenAddress) external view returns (uint256);

    function approveToken(address _tokenAddress) external returns(bool);

    function getListOfDepositableTokens() external view returns(address[] memory);
    function getListOfWithdrawableTokens() external view returns(address[] memory);

     /**
     * @dev Emitted when `value` tokens are deposited from one account (`from`) to
     * the providers vault (``).
     *
     * Note that `data1` and `data2' may be zero. and it's left up to the provider to implement
     */

    event Deposited(address indexed from, address indexed tokenAddress, uint256 value, uint256 data1, uint256 data2);
}
