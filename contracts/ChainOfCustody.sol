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
    	string precinctID;
        string precinctAddress; 
        string sherifName;
        string badgeNumber; 
        string title;
    }

    mapping (address => Actor) actorMap;
    mapping (address => Precinct) precinctMap;

    function NewPrecinct(
    	string precinctID,
        string precinctAddress, 
        string sherrifName, 
        string badgeNumber, 
        string title) 
    public {
        Precinct newPrecinct = Precinct(precinctID, precinctAddress, sherrifName, badgeNumber, title);
        precinctMap[precinctAddress] = newPrecinct; //Map address to precinct
        NewActor(precinctID, "1stAdmin", "bob", "0000", "sherrif", true); //Create first admin
    }

    function NewActor(
        string precinctID, 
        string name, 
        string badgeNumber, 
        string title,
        bool isAdmin) 
    public {
    	Actor newactor = Actor(precinctID, name, badgeNumber, title, isAdmin); //Create new actor instance
        actorMap[msg.sender] = newactor; //Map address to actor
    }
}