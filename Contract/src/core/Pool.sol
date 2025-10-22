// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract YieldPool {
    IERC20 public immutable vUSDT;
    uint256 public yieldRate;
    uint256 public lastUpdate; 
    uint256 public totalDeposited;

    constructor(address _vUSDT) {
        vUSDT = IERC20(_vUSDT);
        _updateYield();
    }

    //To simulate dummy transfers
    function _updateYield() internal {
        if (block.timestamp >= lastUpdate + 10 minutes) {
            uint256 random = uint256(
                keccak256(abi.encodePacked(block.timestamp, block.prevrandao, address(this)))
            ) % 8;
            yieldRate = 3 + random; 
            lastUpdate = block.timestamp;
        }
    }

    function deposit(uint256 amount) external {
        _updateYield();
        require(amount > 0, "Zero");
        vUSDT.transferFrom(msg.sender, address(this), amount);
        totalDeposited += amount;
    }

    function withdrawAll(address to) external returns (uint256 totalOut) {
        _updateYield();
        uint256 yieldAmount = (totalDeposited * yieldRate) / 100;
        totalOut = totalDeposited + yieldAmount;
        totalDeposited = 0;
        vUSDT.transfer(to, totalOut);
    }

    function currentYield() external view returns (uint256) {
        return yieldRate;
    }
}