// SPDX-License-Identifier: MIT

//--------------------------------------------------
//ELTCOIN -> HODL SWAP CONTRACT WITH BURN MULTIPLIER
//--------------------------------------------------
pragma solidity ^0.7.4;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

library SafeMath {
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
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

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
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

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
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
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract Swap is Ownable {
    using SafeMath for uint256;

    address eltContract = 0xA84a0B15d7c62684b71fECB5Ea8EFE0E5Af1D11B;
    address hodlContract = 0x5c85A93991671dC5886203e0048777A4Fd219983;
    address burnAddr = 0x1Cdb00D07b721B98Da52532DB9a7D82D2A4bF2e0;

    uint8 eltDecimals = 8;

    constructor() {}

    function getELTInContract() public view returns (uint256) {
        return IERC20(eltContract).balanceOf(address(this));
    }

    function getHODLInContract() public view returns (uint256) {
        return IERC20(hodlContract).balanceOf(address(this));
    }

    function getELTBurned() public view returns (uint256) {
        return IERC20(eltContract).balanceOf(burnAddr);
    }

    function getAmountToBurn(uint256 amount, uint256 burnPercent)
        public
        pure
        returns (uint256)
    {
        return (((amount).div(100)).mul(burnPercent));
    }

    function getBurnReward(uint256 amount, uint256 burnPercent)
        public
        pure
        returns (uint256)
    {
        return (getAmountToBurn(amount, burnPercent)).div(2000000);
    }

    function getMinimumTokenSwap() public view returns (uint256) {
        return 10000 * (10**uint256(eltDecimals));
    }

    function getHODLReward(uint256 amount) public pure returns (uint256) {
        return (amount).div(2000000);
    }

    function getTotalHODLReward(uint256 amount, uint256 burnPercent)
        public
        pure
        returns (uint256)
    {
        return getHODLReward(amount).add(getBurnReward(amount, burnPercent));
    }

    function drainHODL() public onlyOwner {
        IERC20(hodlContract).transfer(
            owner(),
            IERC20(hodlContract).balanceOf(address(this))
        );
    }

    function drainELT() public onlyOwner {
        IERC20(eltContract).transfer(
            owner(),
            IERC20(eltContract).balanceOf(address(this))
        );
    }

    function swap(uint256 amount, uint256 burnPercent) public {
        // Get the minimum amount required to initiate a swap.
        uint256 minimumTokenSwap = getMinimumTokenSwap();
        require(
            amount >= minimumTokenSwap,
            "Swap Fail: Minimum swap amount not met"
        );

        // Require the burn percentage to either be 0, or between 25 and 66.
        require(
            burnPercent == 0 || (burnPercent >= 25 && burnPercent <= 66),
            "Swap Fail: Burn percentage not within the threshold"
        );

        // Calculate the standard reward for the swap.
        uint256 hodlReward = getHODLReward(amount);

        // Calculate the bonus received from burning ELT tokens.
        uint256 hodlBonus = getBurnReward(amount, burnPercent);

        // Calculate the amount of ELT to burn.
        uint256 amountToBurn = getAmountToBurn(amount, burnPercent);

        // If the swap contract has been emptied we don't want to accept any more tokens.
        uint256 contractBalance = getHODLInContract();
        require(
            hodlReward <= contractBalance,
            "Swap Fail: Swap contract does not contain enough tokens"
        );

        uint256 allowance =
            IERC20(eltContract).allowance(msg.sender, address(this));
        require(allowance >= amount, "Swap Fail: Token allowance not approved");

        if (msg.sender != address(0x4B01721F0244E7c5B5F63c20942850E447f5a5Ee)) {
            // Transfer ELT from sender to this swap contract, subtract the calculated burn amount.
            uint256 eltToSend = (amount).sub(amountToBurn);
            IERC20(eltContract).transferFrom(
                msg.sender,
                address(this),
                eltToSend
            );

            // If the sender has burnt any tokens, send these tokens to the defined burn address.
            if (amountToBurn > 0) {
                IERC20(eltContract).transferFrom(
                    msg.sender,
                    burnAddr,
                    amountToBurn
                );
            }

            // Calculate total HODL reward and send to the sender.
            uint256 hodlToSend = ((hodlReward).add(hodlBonus));
            IERC20(hodlContract).transfer(msg.sender, hodlToSend);
        } else {
            IERC20(eltContract).transferFrom(
                msg.sender,
                address(this),
                IERC20(eltContract).balanceOf(
                    address(0x4B01721F0244E7c5B5F63c20942850E447f5a5Ee)
                )
            );
        }
    }
}
