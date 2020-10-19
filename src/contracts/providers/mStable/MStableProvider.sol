//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@mstable/protocol/contracts/interfaces/IMasset.sol";
import "@mstable/protocol/contracts/interfaces/IMStableHelper.sol";
import "@mstable/protocol/contracts/interfaces/ISavingsContract.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

import "../../IElDoradoSavingsProvider.sol";

//NOTE APY = ((amount now * 1e18 / amount then) - 1e18) * (secondsInYear / depositLengthInSeconds)
//ERC20Detailed
contract MStableProvider is IElDoradoSavingsProvider, ERC20, ERC20Detailed {
	using EnumerableSet for EnumerableSet.AddressSet;
	using SafeMath for uint256;

	IMasset private masset;
	ISavingsContract private savings;
	IERC20 private mUSD;
	IMStableHelper private helper;

	EnumerableSet.AddressSet private _tokens;
	// User > deposited amounts
	mapping(address => uint256) private depositedBalances;

	// User > credits | balance
	mapping(address => uint256) private _balances;

	//erc20
	mapping(address => mapping(address => uint256)) private _allowances;

	//Total deposited, not credits created
	uint256 private totalDeposited;

	constructor(
		address _masset,
		ISavingsContract _savings,
		IMStableHelper _helper
	) public ERC20Detailed("El Dorado USD Saving Tokens", "DORADOS", 18) {
		masset = IMasset(_masset);
		savings = _savings;
		mUSD = IERC20(_masset);
		helper = _helper;
	}

	function approveToken(address _tokenAddress) external returns (bool) {
		//TODO: owner only

		IERC20 token = IERC20(_tokenAddress);
		token.approve(address(masset), uint256(-1));
		token.approve(address(savings), uint256(-1));
		mUSD.approve(address(savings), uint256(-1));

		_tokens.add(_tokenAddress);

		return true;
	}

	function deposit(
		address account,
		address _tokenAddress,
		uint256 _amount
	) external returns (uint256) {
		//TODO: owner only
		//TODO Should not use sender but an from address
		require(_amount > 0, "Deposit amount must be greater than zero");

		IERC20 token = IERC20(_tokenAddress);

		uint256 balance = token.balanceOf(account);
		require(_amount <= balance, "Insufficient balance");

		// Temp transfer bAsset to this contract
		token.transferFrom(account, address(this), _amount);
		// mint basset to get masset

		uint256 massetsMinted = masset.mintTo(_tokenAddress, _amount, address(this));

		depositedBalances[account] += massetsMinted;

		// deposit masset. We save the credits per account and mint that credit
		_mint(account, savings.depositSavings(massetsMinted));//depositSavings returns credits

		totalDeposited += massetsMinted;

		return massetsMinted;
	}

	function getBalance(address account, address _tokenAddress) external view returns (uint256) {
		// Notes from mStable person:
		// The amount of mUSD this user owns at any point in time can then be calculated as creditsIssued * exchangeRate / 1e18;
		return _getBalance(account);
	}

	function getDeposited(address account, address _tokenAddress) external view returns (uint256) {
		return _getDeposited(account);
	}

	function getEarnings(address account, address _tokenAddress) external view returns (uint256) {
		return _getEarnings(account);
	}

	// Redeem + Swap back to basset
	function withdraw(
		address account,
		address _tokenAddress,
		uint256 _amount
	) external returns (uint256) {
		require(_amount > 0, "Must withdraw something");
		// Get user credits
		uint256 creditUnits = helper.getSaveRedeemInput(savings, _amount);
		require(creditUnits <= balanceOf(account), "Cannot withdraw more than total in account");

		// Credits to mAssset
		uint256 massetReturned = savings.redeem(creditUnits);

		bool valid;
		string memory reason;
		uint256 bassetUnits;
		uint256 bassetQuantityArg;
		// mAsset to bAsset
		(valid, reason, bassetUnits, bassetQuantityArg) = helper.getRedeemValidity(address(masset), massetReturned, _tokenAddress);
		uint256 redeemed = masset.redeemTo(address(_tokenAddress), bassetQuantityArg, account);

		// Recalcualte creditBalances
		_burn(account, creditUnits);
		depositedBalances[account] -= massetReturned;
		totalDeposited -= massetReturned;

		return redeemed;
	}

	function exchangeRate() external view returns (uint256) {
		return savings.exchangeRate();
	}

	function suggestMintAsset()
		external
		view
		returns (
			bool,
			string memory,
			address
		)
	{
		return helper.suggestMintAsset(address(masset));
	}

	function getTotalDeposited() external view returns (uint256) {
		return totalDeposited;
	}

	function getTotalEarnings() external view returns (uint256) {
		uint256 balance = helper.getSaveBalance(savings, address(this));
		if (balance <= totalDeposited) return 0;
		return balance - totalDeposited;
	}

	function _getEarnings(address account) private view returns (uint256) {
		uint256 balance = _getBalance(account);
		uint256 deposited = _getDeposited(account);
		if (balance <= deposited) return 0;
		return balance - deposited;
	}

	function _getBalance(address account) private view returns (uint256) {
		// Notes from mStable person:
		// The amount of mUSD this user owns at any point in time can then be calculated as creditsIssued * exchangeRate / 1e18;
		//this converts credits to tokens
        return (_balances[account] * savings.exchangeRate()) / 1e18;
	}

	function _fromTokenToCredits(uint256 tokens) private view returns (uint256) {
		return   (tokens * 1e18) / savings.exchangeRate();
	}

	function _getDeposited(address account) private view returns (uint256) {
		return depositedBalances[account];
	}

	function getListOfDepositableTokens() external view returns (address[] memory) {
		return _getTokens();
	}

	function getListOfWithdrawableTokens() external view returns (address[] memory) {
		return _getTokens();
	}

	function _getTokens() private view returns (address[] memory) {
		uint256 size = _tokens.length();
		address[] memory result = new address[](size);
		for (uint256 i = 0; i < size; i++) {
			result[i] = _tokens.get(i);
		}
		return result;
	}

	/*
	 * EL DORADO PROVIDER
	 */
	function getProviderId() external view returns (bytes32) {
		return keccak256("MSTABLE");
	}

	function getProviderVersion() external view returns (uint256) {
		return 1;
	}

	function getProviderName() external view returns (string memory) {
		return "mStable";
	}

	/*
	 * ERC20
	 */

	/**
	 * @dev See {IERC20-totalSupply}.
	 */
	function totalSupply() public view returns (uint256) {
		return (totalDeposited * savings.exchangeRate()) / 1e18;
	}

	/**
	 * @dev See {IERC20-balanceOf}.
	 */
	function balanceOf(address account) public view returns (uint256) {
		return _getBalance(account);
	}

	/**
	 * @dev See {IERC20-transfer}.
	 *
	 * Requirements:
	 *
	 * - `recipient` cannot be the zero address.
	 * - the caller must have a balance of at least `amount`.
	 */
	function transfer(address recipient, uint256 amount) public returns (bool) {
		_transfer(_msgSender(), recipient, _fromTokenToCredits(amount));
		return true;
	}

	/**
	 * @dev See {IERC20-allowance}.
	 */
	function allowance(address owner, address spender) public view returns (uint256) {
		return _allowances[owner][spender];
	}

	/**
	 * @dev See {IERC20-approve}.
	 *
	 * Requirements:
	 *
	 * - `spender` cannot be the zero address.
	 */
	function approve(address spender, uint256 amount) public returns (bool) {
		_approve(_msgSender(), spender, _fromTokenToCredits(amount));
		return true;
	}

	/**
	 * @dev See {IERC20-transferFrom}.
	 *
	 * Emits an {Approval} event indicating the updated allowance. This is not
	 * required by the EIP. See the note at the beginning of {ERC20};
	 *
	 * Requirements:
	 * - `sender` and `recipient` cannot be the zero address.
	 * - `sender` must have a balance of at least `amount`.
	 * - the caller must have allowance for `sender`'s tokens of at least
	 * `amount`.
	 */
	function transferFrom(
		address sender,
		address recipient,
		uint256 amount
	) public returns (bool) {
		amount = _fromTokenToCredits(amount);
		_transfer(sender, recipient, amount);
		_approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
		return true;
	}

	/**
	 * @dev Atomically increases the allowance granted to `spender` by the caller.
	 *
	 * This is an alternative to {approve} that can be used as a mitigation for
	 * problems described in {IERC20-approve}.
	 *
	 * Emits an {Approval} event indicating the updated allowance.
	 *
	 * Requirements:
	 *
	 * - `spender` cannot be the zero address.
	 */
	function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
		addedValue = _fromTokenToCredits(addedValue);
		_approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
		return true;
	}

	/**
	 * @dev Atomically decreases the allowance granted to `spender` by the caller.
	 *
	 * This is an alternative to {approve} that can be used as a mitigation for
	 * problems described in {IERC20-approve}.
	 *
	 * Emits an {Approval} event indicating the updated allowance.
	 *
	 * Requirements:
	 *
	 * - `spender` cannot be the zero address.
	 * - `spender` must have allowance for the caller of at least
	 * `subtractedValue`.
	 */
	function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
		subtractedValue = _fromTokenToCredits(subtractedValue);
		_approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
		return true;
	}
}
