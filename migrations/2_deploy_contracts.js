var ChainOfCustody = artifacts.require("./ChainOfCustody.sol");

module.exports = function(deployer) {
  deployer.deploy(ChainOfCustody);
};
