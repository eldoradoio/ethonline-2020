//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@mstable/protocol/contracts/interfaces/IMasset.sol";
import "@mstable/protocol/contracts/interfaces/IMStableHelper.sol";
import "@mstable/protocol/contracts/interfaces/ISavingsContract.sol";

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

import "../../IElDoradoSavingsProvider.sol";

//NOTE APY = ((amount now * 1e18 / amount then) - 1e18) * (secondsInYear / depositLengthInSeconds)
//ERC20Detailed
contract MStableProvider is IElDoradoSavingsProvider, Context, IERC20, ERC20Detailed {
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

    //Total credits
    uint256 private _totalSupply;

	 /**
     * @dev Emitted when `value` tokens are deposited from one account (`from`) to
     * the providers vault (``).
     *
     * Note that `data1` and `data2' may be zero. and it's left up to the provider to implement
     */

    event Deposited(address indexed from, address indexed tokenAddress, uint256 value, uint256 data1, uint256 data2);

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
		_mint(account, savings.depositSavings(massetsMinted)); //depositSavings returns credits

		totalDeposited += massetsMinted;

		emit Deposited(account, _tokenAddress, _amount, savings.exchangeRate(), 0);

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
		return (tokens * 1e18) / savings.exchangeRate();
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
		return _allowances[owner][spender]; //TODO: To tokens?
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



	/**
	 * @dev Moves tokens `amount` from `sender` to `recipient`.
	 *
	 * This is internal function is equivalent to {transfer}, and can be used to
	 * e.g. implement automatic token fees, slashing mechanisms, etc.
	 *
	 * Emits a {Transfer} event.
	 *
	 * Requirements:
	 *
	 * - `sender` cannot be the zero address.
	 * - `recipient` cannot be the zero address.
	 * - `sender` must have a balance of at least `amount`.
	 */
	function _transfer(
		address sender,
		address recipient,
		uint256 amount
	) internal {
		require(sender != address(0), "ERC20: transfer from the zero address");
		require(recipient != address(0), "ERC20: transfer to the zero address");

		_balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
		_balances[recipient] = _balances[recipient].add(amount);
		emit Transfer(sender, recipient, amount);
	}

	/** @dev Creates `amount` tokens and assigns them to `account`, increasing
	 * the total supply.
	 *
	 * Emits a {Transfer} event with `from` set to the zero address.
	 *
	 * Requirements
	 *
	 * - `to` cannot be the zero address.
	 */
	function _mint(address account, uint256 amount) internal {
		require(account != address(0), "ERC20: mint to the zero address");

		_totalSupply = _totalSupply.add(amount);
		_balances[account] = _balances[account].add(amount);
		emit Transfer(address(0), account, amount);
	}

	/**
	 * @dev Destroys `amount` tokens from `account`, reducing the
	 * total supply.
	 *
	 * Emits a {Transfer} event with `to` set to the zero address.
	 *
	 * Requirements
	 *
	 * - `account` cannot be the zero address.
	 * - `account` must have at least `amount` tokens.
	 */
	function _burn(address account, uint256 amount) internal {
		require(account != address(0), "ERC20: burn from the zero address");

		_balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
		_totalSupply = _totalSupply.sub(amount);
		emit Transfer(account, address(0), amount);
	}

	/**
	 * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
	 *
	 * This is internal function is equivalent to `approve`, and can be used to
	 * e.g. set automatic allowances for certain subsystems, etc.
	 *
	 * Emits an {Approval} event.
	 *
	 * Requirements:
	 *
	 * - `owner` cannot be the zero address.
	 * - `spender` cannot be the zero address.
	 */
	function _approve(
		address owner,
		address spender,
		uint256 amount
	) internal {
		require(owner != address(0), "ERC20: approve from the zero address");
		require(spender != address(0), "ERC20: approve to the zero address");

		_allowances[owner][spender] = amount;
		emit Approval(owner, spender, amount);
	}

	/**
	 * @dev Destroys `amount` tokens from `account`.`amount` is then deducted
	 * from the caller's allowance.
	 *
	 * See {_burn} and {_approve}.
	 */
	function _burnFrom(address account, uint256 amount) internal {
		_burn(account, amount);
		_approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "ERC20: burn amount exceeds allowance"));
	}
}
