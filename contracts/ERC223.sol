// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import "./SafeMath.sol";

interface ERC223 {
    function balanceOf(address who) external view returns (uint256);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function transfer(
        address to,
        uint256 value,
        bytes memory data
    ) external returns (bool);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event ERC223Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value,
        bytes _data
    );
}

abstract contract ContractReceiver {
    function tokenFallback(
        address _from,
        uint256 _value,
        bytes memory _data
    ) public virtual;
}

contract ERC223Token is ERC223 {
    using SafeMath for uint256;

    mapping(address => uint256) balances;

    string _name;
    string _symbol;
    uint8 _decimals;
    uint256 _totalSupply;

    // Function to access name of token .
    function name() public view override returns (string memory) {
        return _name;
    }

    // Function to access symbol of token .
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    // Function to access decimals of token .
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    // Function to access total supply of tokens .
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    // Function that is called when a user or another contract wants to transfer funds .
    function transfer(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public override returns (bool success) {
        if (isContract(_to)) {
            return transferToContract(_to, _value, _data);
        } else {
            return transferToAddress(_to, _value, _data);
        }
    }

    // Standard function transfer similar to ERC20 transfer with no _data .
    // Added due to backwards compatibility reasons .
    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool success)
    {
        //standard function transfer similar to ERC20 transfer with no _data
        //added due to backwards compatibility reasons
        bytes memory empty;
        if (isContract(_to)) {
            return transferToContract(_to, _value, empty);
        } else {
            return transferToAddress(_to, _value, empty);
        }
    }

    //assemble the given address bytecode. If bytecode exists then the _addr is a contract.
    function isContract(address _addr) private view returns (bool is_contract) {
        uint256 length;
        assembly {
            //retrieve the size of the code on target address, this needs assembly
            length := extcodesize(_addr)
        }
        if (length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function balanceOf(address _owner)
        public
        view
        override
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    //function that is called when transaction target is an address
    function transferToAddress(
        address _to,
        uint256 _value,
        bytes memory _data
    ) private returns (bool success) {
        if (balanceOf(msg.sender) < _value) revert();
        balances[msg.sender] = balanceOf(msg.sender).sub(_value);
        balances[_to] = balanceOf(_to).add(_value);
        emit Transfer(msg.sender, _to, _value);
        emit ERC223Transfer(msg.sender, _to, _value, _data);
        return true;
    }

    //function that is called when transaction target is a contract
    function transferToContract(
        address _to,
        uint256 _value,
        bytes memory _data
    ) private returns (bool success) {
        if (balanceOf(msg.sender) < _value) revert();
        balances[msg.sender] = balanceOf(msg.sender).sub(_value);
        balances[_to] = balanceOf(_to).add(_value);
        ContractReceiver reciever = ContractReceiver(_to);
        reciever.tokenFallback(msg.sender, _value, _data);
        Transfer(msg.sender, _to, _value);
        ERC223Transfer(msg.sender, _to, _value, _data);
        return true;
    }
}
