pragma solidity ^0.4.18;
contract ChainOfCustody {

    // modifier onlyOwnedBy(address _requester, uint _profId) {
    // 	require(profToOwner[_profId] == _requester);
    //   	_;
    // }

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
    	uint ID;
        string Name; 
    }

    mapping (address => Actor) public actorMap;
    mapping (uint => Precinct) public precinctMap;

    function NewPrecinct(
    	uint precinctID,
        string precinctName,
        string actorName, 
        string badgeNumber, 
        string title) 
    public {
        // Precinct newPrecinct = 
        precinctMap[precinctID] = Precinct(precinctID, precinctName); //Map id to precinct
        NewActor(precinctID, actorName, badgeNumber, title, true); //Create first admin
    }

    function NewActor(
        uint precinctID, 
        string name, 
        string badgeNumber, 
        string title,
        bool isAdmin) 
    public {
    	// Actor storage newactor = 
        actorMap[msg.sender] = Actor(precinctID, name, badgeNumber, title, isAdmin); //Create new actor instance
    }
}