//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

// We use this reference so buidler adds the artifact for us to use in the tests
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "../../IElDoradoSavingsProvider.sol";

import "@nomiclabs/buidler/console.sol";

contract MockProvider is IElDoradoSavingsProvider {
    function deposit(address _tokenAddress, uint256 _amount) external view returns(uint256){
        require(address(_tokenAddress) != address(0), "Invalid address");
        return _amount;
    }
    function withdraw(address _tokenAddress, uint256 _amount) external returns(uint256){
        require(address(_tokenAddress) != address(0), "Invalid address");
        return _amount;
    }
    function getBalance() external view returns(uint256){
        return 0;
    }
    function getEarnings() external view returns(uint256){
        return 0;
    }
}