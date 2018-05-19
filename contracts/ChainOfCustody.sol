pragma solidity ^0.4.18;
contract ChainOfCustody {

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
    function ChainOfCustody() public payable {
    }

    function ClaimProf(uint _profId) 
    payable
    onlyOwnedBy(0x00, _profId)
    public {
        require(msg.value == 2146291208791208);
    	profToOwner[_profId] = msg.sender;
    }
}