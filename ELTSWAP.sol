//----------------------------
//ELTCOIN 2 HODL SWAP CONTRACT
//----------------------------
pragma solidity ^0.6.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}
 
contract Swap {
    address eContract = 0xa15d69712D3C60eb36f6285f0dF6a198cc371f6a;
    address hdContract = 0xFCEC9b98264d2Cc3517C286b7C81Ae930ffB8016;
    address burnAddr =   0xFFFFFFFFFFFFF000000000000000000000000000; //TODO: Find funny ascii burn address ( @bigboyadam )
    uint256 totalELTBurned = 0;

    constructor() public {

        
    }
    
    function getETokensInContract() public view returns (uint256) {
        return IERC20(eContract).balanceOf(address(this));
    }
    
    function getHDTokensInContract() public view returns (uint256) {
        return IERC20(hdContract).balanceOf(address(this));
    }

    function getETokensBurned(burnAddr) public view retuns (uint256) {
        return IERC20(burnAddr).balanceOf(burnAddr); //TODO connor check if i'm retarded

    }
    
    function swap(uint256 amount, uint256 burnPercent) public {
        //SafeMath burn ratio calc = (amount / 100)*burnPercent = a

        require(amount > 0, "Minimum token swap: 0");
        
        uint256 contractBalance = IERC20(hdContract).balanceOf(address(this));
        //contractBalance swap to ELTSWAP hardcap
        require(amount <= contractBalance, "Swap contact does not have enough tokens.");
        // This is the allocation, here we must add the multiplier using safeMath
        uint256 allowance = IERC20(eContract).allowance(msg.sender, address(this));
        require(allowance >= amount, "Token allowance failed: probably haven't approved.");
        
        // Send E Tokens from sender to contract
        IERC20(eContract).transferFrom(msg.sender, address(this), amount);
        
        //Burn 'a' tokens resulting in b 'change'

        // Send HD Tokens from contract to sender
        IERC20(hdContract).transfer(msg.sender, amount);
        // Call IRC20 again for eContract to transfer(msg.sender, 'b')
    }
}
