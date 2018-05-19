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
    	uint precinctID; 
        string name; 
        string badgeNumber; 
        string title;
        bool isAdmin; 
    }

    struct Precinct{
    	uint precinctID;
        string precinctName; 
    }

    mapping (address => Actor) actorMap;
    mapping (uint => Precinct) precinctMap;

    function NewPrecinct(
    	uint precinctID,
        string precinctName,
        string sherrifName, 
        string badgeNumber, 
        string title) 
    public {
        Precinct newPrecinct = Precinct(precinctID, precinctName);
        precinctMap[precinctID] = newPrecinct; //Map id to precinct
        NewActor(precinctID, sherrifName, badgeNumber, title, true); //Create first admin
    }

    function NewActor(
        uint precinctID, 
        string name, 
        string badgeNumber, 
        string title,
        bool isAdmin) 
    public {
    	Actor newactor = Actor(precinctID, name, badgeNumber, title, isAdmin); //Create new actor instance
        actorMap[msg.sender] = newactor; //Map address to actor
    }
}