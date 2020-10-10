//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.15;

import "@mstable/protocol/contracts/interfaces/IMasset.sol";
import "../../IElDoradoSavingsProvider.sol";

contract MStableProvider is IElDoradoSavingsProvider {
    constructor(IMasset masset) public {

    }    

    function deposit() external view returns(bool){
        return true;
    }
}