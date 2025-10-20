// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    // User balances for deposit, locked, and available
    struct UserData {
        uint lockedBalance;
        uint availableBalance;
    }

    mapping(address => UserData) userData;
    IERC20 immutable vUSDT; // Collateral token

    // Events
    event CollateralDeposited(address indexed user, uint amount);
    event CollateralWithdrawn(address indexed user, uint amount);
    event CollateralLocked(address indexed user, uint amount);
    event CollateralUnlocked(address indexed user, uint amount);

    // Set token address during deployment
    constructor(address _vUSDT) Ownable(msg.sender) {
        vUSDT = IERC20(_vUSDT);
    }

    // Deposit collateral into the vault
    function depositCollateral(uint _amount) external {
        require(_amount > 0, "Amount should be greater than 0");
        require(vUSDT.allowance(msg.sender, address(this)) >= _amount);
        require(
            vUSDT.transferFrom(msg.sender, address(this), _amount),
            "Unable to transfer"
        );

        userData[msg.sender].availableBalance += _amount;

        emit CollateralDeposited(msg.sender, _amount);
    }

    // Withdraw available collateral
    function withdrawCollateral(uint _amount) external {
        require(_amount > 0, "Amount should be greater than 0");
        require(
            userData[msg.sender].availableBalance >= _amount,
            "Insufficient available balance"
        );

        userData[msg.sender].availableBalance -= _amount;

        require(vUSDT.transfer(msg.sender, _amount), "Transfer failed");

        emit CollateralWithdrawn(msg.sender, _amount);
    }

    // Lock collateral for a user
    function lockCollateral(address _user, uint _amount) external {
        require(_amount > 0, "Amount should be greater than 0");
        require(
            userData[_user].availableBalance >= _amount,
            "Insufficient available balance"
        );

        userData[_user].availableBalance -= _amount;
        userData[_user].lockedBalance += _amount;

        emit CollateralLocked(_user, _amount);
    }

    // Unlock previously locked collateral
    function unlockCollateral(address _user, uint _amount) external {
        require(_amount > 0, "Amount should be greater than 0");
        require(
            userData[_user].lockedBalance >= _amount,
            "Insufficient locked balance to unlock"
        );

        userData[_user].lockedBalance -= _amount;
        userData[_user].availableBalance += _amount;

        emit CollateralUnlocked(_user, _amount);
    }

    // Get caller's balances
    function getUserCollateral() external view returns (UserData memory) {
        return userData[msg.sender];
    }

    // Fallback function - handles unknown calls
    fallback() external {
        revert("Incorrect function call");
    }

    // Receive function - handles plain ETH transfers
    receive() external payable {
        revert("Contract does not accept ETH");
    }
}
