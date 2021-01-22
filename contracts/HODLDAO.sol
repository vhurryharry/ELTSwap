// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import "./ERC223.sol";
import "./SafeMath.sol";

contract HODLDAO is ERC223Token {
    using SafeMath for uint256;

    constructor() {
        _name = "HODL-DAO";
        _symbol = "HODL";
        _decimals = 8;
        _totalSupply = 1000000 * (10**_decimals);

        balances[msg.sender] = 1000000 * (10**_decimals);
    }
}
