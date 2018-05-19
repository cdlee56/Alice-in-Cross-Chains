pragma solidity ^0.4.18;
contract Tracker {

    address public owner;
    address public owner2;

    mapping (uint => address) public profToOwner;

    struct Bid {
        address bidder;
        uint value;
    }

    modifier onlyOwnedBy(address _requester, uint _profId) {
    	require(profToOwner[_profId] == _requester);
      	_;
    }

    /* Initializes contract with initial supply tokens to the creator of the contract */
    function CryptoProfsMarket() public payable {
        owner = msg.sender;
    }

    function ClaimProf(uint _profId) 
    payable
    onlyOwnedBy(0x00, _profId)
    public {
        require(msg.value == 2146291208791208);
    	profToOwner[_profId] = msg.sender;
    }
}