pragma solidity ^0.4.24;

import "./ERC223.sol";
import "./SafeMath.sol";

contract HODLDAO is ERC223Token {
  using SafeMath for uint256;

  string public name = "HODL-DAO";
  string public symbol = "HODL";
  uint public decimals = 8;
  uint public totalSupply = 1000000 * (10**decimals);

  constructor() public {
    balances[msg.sender] = 1000000 * (10**decimals);
  }
}

