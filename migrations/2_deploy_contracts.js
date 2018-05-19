var Tracker = artifacts.require("./Tracker.sol");

module.exports = function(deployer) {
  deployer.deploy(Tracker);
};
