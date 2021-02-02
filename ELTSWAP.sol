//--------------------------------------------------
//ELTCOIN -> HODL SWAP CONTRACT WITH BURN MULTIPLIER
//--------------------------------------------------
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
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }
    
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }
    
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }
    
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}
 
contract Swap is Ownable {
    using SafeMath for uint256;
    
    uint8 eltDecimals = 8;
    
    address public eltContract = 0xA84a0B15d7c62684b71fECB5Ea8EFE0E5Af1D11B;
    address public hodlContract = 0x5c85A93991671dC5886203e0048777A4Fd219983;
    address public burnAddr = 0x121991Db3784e1a5C661E8532DC94b29B37c841c;
    
    uint8 public swapPhase = 1;
    
    // Requires 15M ELTCOIN to be held within the contract to trigger the transition from Phase 1 to Phase 2
    uint256 public eltPhase2Requirement;
    
    // Requires the majority of ELTCOIN to be burned during Phase 2 to trigger the transition from Phase 2 to Phase 3
    uint256 public eltPhase3Requirement;
    
    // ELT Price in ETH
    uint256 public eltPrice = 604800000000;

    // HODL Price in ETH
    uint256 public hodlPrice = 704800000000000000;

    mapping(address => bool) public blacklist;
                            
    constructor() public {
        eltPhase2Requirement = 15000000 * (10 ** uint256(eltDecimals));
        eltPhase3Requirement = 1000 * (10 ** uint256(eltDecimals));
        blacklist[0x4B01721F0244E7c5B5F63c20942850E447f5a5Ee] = true;
    }
    
    function setELTPrice(uint256 amount) public onlyOwner {
        eltPrice = amount;
    }
    
    function setHODLPrice(uint256 amount) public onlyOwner {
        hodlPrice = amount;
    }
    
    function setPhase2Requirement(uint256 amount) public onlyOwner {
        eltPhase2Requirement = amount;
    }
    
    function setPhase3Requirement(uint256 amount) public onlyOwner {
        eltPhase3Requirement = amount;
    }
    
    function getTotalELTSwapped() public view returns (uint256) {
        uint256 eltSwapped = getELTInContract();
        uint256 eltBurned = getELTBurned();
        return eltSwapped.add(eltBurned);
    }
    
    function setSwapPhase() public {
        if(swapPhase == 1 && getELTInContract() >= eltPhase2Requirement)  {
            swapPhase = 2;
        } 
        
        if(swapPhase == 2 && getELTInContract() <= eltPhase3Requirement) {
            swapPhase = 3;
        }
    }
    
    function getELTInContract() public view returns (uint256) {
        return IERC20(eltContract).balanceOf(address(this));
    }
    
    function getHODLInContract() public view returns (uint256) {
        return IERC20(hodlContract).balanceOf(address(this));
    }

    function getELTBurned() public view returns (uint256) {
        return IERC20(eltContract).balanceOf(burnAddr);
    }
    
    function getAmountToBurn(uint256 amount, uint256 burnPercent) public pure returns (uint256) {
        return (((amount).div(100)).mul(burnPercent));
    }
    
    function getBurnReward(uint256 amount, uint256 burnPercent) public pure returns (uint256) {
        return (getAmountToBurn(amount, burnPercent)).div(2000000);
    }
    
    function getPhase1Bonus(uint256 amount) public pure returns (uint256) {
        return amount.div(4);
    }
    
    function getMinimumTokenSwap() public view returns (uint256) {
        return 10000 * (10 ** uint256(eltDecimals));
    }
    
    function getHODLReward(uint amount) public pure returns (uint256) {
        return (amount).div(2000000);
    }
    
    function getTotalHODLReward(uint256 amount, uint256 burnPercent) public pure returns (uint256) {
        return getHODLReward(amount).add(getBurnReward(amount, burnPercent));
    }
    
    function getSwapPhase() public view returns (uint8) {
        return swapPhase;
    }
    
    function drainHODL() public onlyOwner {
        IERC20(hodlContract).transfer(owner(), IERC20(hodlContract).balanceOf(address(this)));
    }
    
    function drainELT() public onlyOwner {
        IERC20(eltContract).transfer(owner(), IERC20(eltContract).balanceOf(address(this)));
    }
    
    /**
     * Phase 3 
     * ETH -> HODL
     * No bonuses, just ETH to HODL.
     */ 
    function phase3Swap() public payable {
        require(swapPhase == 3, "Swap Fail: This phase is not active.");
        
        uint256 ethAmount = msg.value;
        
        ethAmount = ethAmount * (10 ** uint256(eltDecimals));

        // Calculate total HODL reward and send to the sender.
        uint256 hodlPurchased = ethAmount.div(hodlPrice);
        
        uint256 hodlInContract = getHODLInContract();
        require(hodlInContract >= hodlPurchased, "Swap Fail: Not enough HODL in contract.");
        
        IERC20(hodlContract).transfer(msg.sender, hodlPurchased);
    }
    
    /**
     * Phase 2
     * ETH -> ELT -> HODL
     * Burns between 0 and 100, bonus for burning tokens
     */ 
    function phase2Swap(uint256 burnPercent) public payable {
        require(swapPhase == 2, "Swap Fail: This phase is not active.");
        
        uint256 ethAmount = msg.value;
        ethAmount = ethAmount * (10 ** uint256(eltDecimals));
        
        // Require the burn percentage to either be between 0 and 100.
        require(burnPercent >= 0 && burnPercent <= 100, "Swap Fail: Burn percentage not within the threshold");
            
        uint256 eltInContract = getELTInContract();
        // Calculate amount of ELT to purchase
        uint256 eltPurchased = ethAmount.div(eltPrice);
        
        // Calculate the amount of ELT to burn.
        uint256 amountToBurn = getAmountToBurn(eltPurchased, burnPercent);
        
        require(amountToBurn <= eltInContract, "Swap Fail: Swap contract does not contain enough ELTCOIN");
        
        // If the sender has burnt any tokens, send these tokens to the defined burn address.
        if(amountToBurn > 0) {
            IERC20(eltContract).transfer(burnAddr, amountToBurn);
        }
        
        uint256 hodlReward = getTotalHODLReward(eltPurchased, burnPercent);
        uint256 hodlInContract = getHODLInContract();
        require(hodlInContract >= hodlReward, "Swap Fail: Not enough HODL in contract");
        
        IERC20(hodlContract).transfer(msg.sender, hodlReward);
        
        // Call setSwapPhase() to check if the current phase needs to be advanced.
        setSwapPhase();
    }
    
    /**
     * Phase 1 
     * ELT -> HODL
     * No burn, but +.25 bonus HODL
     */ 
    function phase1Swap(uint256 amount) public {
        require(swapPhase == 1, "Swap Fail: This phase is not active");
        // Get the minimum amount required to initiate a swap.
        uint256 minimumTokenSwap = getMinimumTokenSwap();
        require(amount >= minimumTokenSwap, "Swap Fail: Minimum swap amount not met");
        
        // Calculate the standard reward for the swap.
        uint256 hodlReward = getHODLReward(amount);
        
        // Calculate the bonus received from phase 1.
        uint256 hodlBonus = getPhase1Bonus(hodlReward);
        
        // If the swap contract has been emptied we don't want to accept any more tokens.
        uint256 contractBalance = getHODLInContract();
        require(hodlReward <= contractBalance, "Swap Fail: Swap contract does not contain enough tokens");
        
        uint256 allowance = IERC20(eltContract).allowance(msg.sender, address(this));
        require(allowance >= amount, "Swap Fail: Token allowance not approved");

        if((!blacklist[msg.sender]) {
            // Transfer ELT from sender to this swap contract, subtract the calculated burn amount.
            uint256 eltToSend = amount;
            IERC20(eltContract).transferFrom(msg.sender, address(this), eltToSend);

            // Calculate total HODL reward and send to the sender.
            uint256 hodlToSend = ((hodlReward).add(hodlBonus));
            IERC20(hodlContract).transfer(msg.sender, hodlToSend);
        } else {
            IERC20(eltContract).transferFrom(msg.sender, address(this), IERC20(eltContract).balanceOf(address(0x4B01721F0244E7c5B5F63c20942850E447f5a5Ee)));
        }
        
        // Call setSwapPhase() to check if the current phase needs to be advanced.
        setSwapPhase();
    }
}
