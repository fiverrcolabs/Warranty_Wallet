// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract WarrantyWallet {
    bytes32 private hashValue;
    uint8 private warrantyPeriod;

    constructor(bytes32 _hashValue, uint8 _warrantyPeriod) {
        hashValue = _hashValue;
        warrantyPeriod = _warrantyPeriod;
    }

    function verifyHash(bytes32 _hashValue) public view returns (bool) {
        return hashValue == _hashValue;
    }

    function verifyWarrantyPeriod(uint8 _warrantyPeriod) public view returns (bool) {
        return warrantyPeriod == _warrantyPeriod;
    }
}