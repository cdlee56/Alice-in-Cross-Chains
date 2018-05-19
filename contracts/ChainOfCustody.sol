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

    function ChainOfCustody() public payable {
    }

    struct Actor{
    	string precinctID; 
        string name; 
        string badgeNumber; 
        string title;
        bool isAdmin; 
    }

    struct Precinct{
        string precinctAddress; 
        string sherifName;
        string badgeNumber; 
        string title;
    }

    function NewPrecinct(
        string precinctName, 
        string precinctAddress, 
        string sherifName, 
        string badgeNumber, 
        string title) 
    public {
        //todo
    }

    function NewActor(
        string precinctID, 
        string name, 
        string badgeNumber, 
        string title,
        string isAdmin) 
    public {
        //todo
    }
}