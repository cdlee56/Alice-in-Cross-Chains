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
        mapping(uint => Evidence) evidence;
        uint evidenceCount;
    }

    struct Evidence{
        uint ID;
        uint precinctID;

        string image;

        mapping(uint => Action) actions;
        uint actionCount;
    }

    struct Action{
        uint ID;
        uint evidenceID;
        address actor;
        string action;
        uint256 timestamp;
        string location;
    }

    mapping (address => Actor) public actorMap;
    
    //refactor into array?
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
        // ID, precinctName, precinctAddress
        precinctMap[ID] = Precinct({ID: ID, Name: precinctName, Address: precinctAddress,evidenceCount: 0}); 

        //Map id to precinct
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

    function NewEvidence(
        uint precinctID, 
        string img,
        address actor,
        string action,
        string location) 
    public {
        Precinct storage pre = precinctMap[precinctID];
        pre.evidence[pre.evidenceCount++] = Evidence({
            ID: pre.evidenceCount,
            precinctID: pre.ID,
            image: img,
            actionCount: 0
            });

        NewAction(precinctID, pre.evidenceCount, actor, action, location);
    }


    function NewAction(
        uint precinctID, 
        uint evidenceID,
        address actor,
        string action,
        string location) 
    public {
        Evidence storage ev = precinctMap[precinctID].evidence[evidenceID];
        ev.actions[ev.actionCount++] = Action({
            ID: ev.actionCount,
            evidenceID: evidenceID,
            actor: actor,
            action: action,
            timestamp: block.timestamp,
            location: location
            });
    }
}
