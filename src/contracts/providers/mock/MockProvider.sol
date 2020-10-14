//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

// We use this reference so buidler adds the artifact for us to use in the tests
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

import "../../IElDoradoSavingsProvider.sol";

import "@nomiclabs/buidler/console.sol";

contract MockProvider is IElDoradoSavingsProvider {
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 private totalDeposited;
    mapping(address => uint256) private _balances;
    EnumerableSet.AddressSet private _accountHolders;

    function deposit(
        address account,
        address _tokenAddress,
        uint256 _amount
    ) external returns (uint256) {
        require(address(_tokenAddress) != address(0), "Invalid address");
        _accountHolders.add(account);
        _balances[account] += _amount;
        totalDeposited += _amount;
        return _amount;
    }

    function withdraw(
        address account,
        address _tokenAddress,
        uint256 _amount
    ) external returns (uint256) {
        require(address(_tokenAddress) != address(0), "Invalid address");
        _balances[account] -= _amount;
        totalDeposited -= _amount;
        return _amount;
    }

    function getBalance(address account) external view returns (uint256) {
        return _balances[account];
    }

    function getEarnings(address account) external view returns (uint256) {
        return _balances[account];
    }

    function approveToken(address _tokenAddress) external returns (bool) {
        IERC20 token = IERC20(_tokenAddress);
        token.approve(address(this), uint256(-1));
        return true;
    }

    function getTotalDeposited() external view returns (uint256) {
        return totalDeposited;
    }

    function simulate() external returns (uint256) {
        for (uint256 i = 0; i < _accountHolders.length(); i++) {
            _balances[_accountHolders.get(i)] += 1;
        }
        return 0;
    }
}
