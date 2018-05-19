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

    struct Evidence{
    	string image;
    	uint ID;
    	uint precinctID;
    }

    struct Action{
    	uint evidenceID;
    	string actor;
    	string action;
    	string timestamp;
    	string location;
    }

    Evidence[] public evidenceStack;
    Action[] public actionStack;

    mapping (address => Actor) actorMap;
    mapping (uint => Precinct) precinctMap;
    mapping (uint => Evidence) evidenceMap;

    function NewPrecinct(
    	uint precinctID,
        string precinctName,
        string precinctAddress,
        string actorName, 
        string badgeNumber, 
        string title) 
    public {
        precinctMap[precinctID] = Precinct(precinctID, precinctName, precinctAddress); //Map id to precinct
        NewActor(precinctID, actorName, badgeNumber, title, true); //Create first admin
    }

    function NewActor(
        uint precinctID, 
        string name, 
        string badgeNumber, 
        string title,
        bool isAdmin) 
    public {
        actorMap[msg.sender] = Actor(precinctID, name, badgeNumber, title, isAdmin); //Create new actor instance
    }

    function newEvidence (string image,
        uint ID,
        uint precinctID) public {
        evidenceMap[ID] = Evidence(image, ID, precinctID);
    }

    function newAction (uint evidenceID,
        string actor,
        string action,
        string timestamp,
        string location) {
        actionStack.push(Action(evidenceID, actor, action, timestamp, location));
    }
}