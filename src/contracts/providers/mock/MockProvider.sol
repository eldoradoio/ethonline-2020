//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

// We use this reference so buidler adds the artifact for us to use in the tests
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

import "@openzeppelin/contracts/utils/EnumerableSet.sol";

import "../../IElDoradoSavingsProvider.sol";

import "@nomiclabs/buidler/console.sol";

contract MockProvider is IElDoradoSavingsProvider {
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 private totalDeposited;
    mapping(address => uint256) private _deposited;
    mapping(address => uint256) private _balances;
    EnumerableSet.AddressSet private _accountHolders;
    EnumerableSet.AddressSet private _tokens;

    function deposit(
        address _account,
        address _tokenAddress,
        uint256 _amount
    ) external returns (uint256) {
        require(address(_tokenAddress) != address(0), "Invalid address");
        _accountHolders.add(_account);
        _deposited[_account] += _amount;
        _balances[_account] += _amount;
        totalDeposited += _amount;

        if (!_tokens.contains(_tokenAddress)) {
            _tokens.add(_tokenAddress);
        }

        return _amount;
    }

    function withdraw(
        address _account,
        address _tokenAddress,
        uint256 _amount
    ) external returns (uint256) {
        require(address(_tokenAddress) != address(0), "Invalid address");
        _balances[_account] -= _amount;
        totalDeposited -= _amount;
        return _amount;
    }

    function getBalance(address _account, address _tokenAddress)
        external
        view
        returns (uint256)
    {
        return _balances[_account];
    }

    function getEarnings(address _account, address _tokenAddress)
        external
        view
        returns (uint256)
    {
        return _balances[_account];
    }

    function getDeposited(address _account, address _tokenAddress)
        external
        view
        returns (uint256)
    {
        return _deposited[_account];
    }

    function approveToken(address _tokenAddress) external returns (bool) {
        IERC20 token = IERC20(_tokenAddress);
        token.approve(address(this), uint256(-1));
        return true;
    }

    function simulate() external returns (uint256) {
        for (uint256 i = 0; i < _accountHolders.length(); i++) {
            _balances[_accountHolders.get(i)] += 1;
        }
        return 0;
    }

    function getListOfDepositableTokens()
        external
        view
        returns (address[] memory)
    {
        return _getTokens();
    }

    function getListOfWithdrawableTokens()
        external
        view
        returns (address[] memory)
    {
        return _getTokens();
    }

    function _getTokens() private view returns (address[] memory) {
        uint256 size = _tokens.length();
        address[] memory result = new address[](size) ;
        for (uint256 i = 0; i < size; i++) {
            result[i] = _tokens.get(i);
        }
        return result;
    }
}
