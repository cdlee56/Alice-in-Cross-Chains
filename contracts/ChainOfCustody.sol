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
        string Address;
    }

    mapping (address => Actor) public actorMap;
    mapping (uint => Precinct) public precinctMap;

    uint PrecinctIDCounter = 0;

    function NewPrecinct(
        string precinctName,
        string precinctAddress,
        string actorName, 
        string badgeNumber, 
        string title) 
    public {
        uint ID = PrecinctIDCounter++;
        precinctMap[ID] = Precinct(ID, precinctName, precinctAddress); //Map id to precinct
        NewActor(ID, msg.sender, actorName, badgeNumber, title, true); //Create first admin
    }

    function NewActor(
        uint precinctID, 
        address addr,
        string name, 
        string badgeNumber, 
        string title,
        bool isAdmin) 
    public {
    	// Actor storage newactor = 
        actorMap[addr] = Actor(precinctID, name, badgeNumber, title, isAdmin); //Create new actor instance
    }
}
