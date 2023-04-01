// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract WarrentyWallet {
    bytes32 private hashValue;

    constructor(bytes32 _hashValue) {
        hashValue = _hashValue;
    }

    function verifyHash(bytes32 _hashValue) public view returns (bool) {
        return hashValue == _hashValue;
    }
}