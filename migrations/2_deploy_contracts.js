var ConvertLib = artifacts.require("./ConvertLib.sol");
var CryptoProfsMarket = artifacts.require("./CryptoProfsMarket.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, CryptoProfsMarket);
  deployer.deploy(CryptoProfsMarket);
};
