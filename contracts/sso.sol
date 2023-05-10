// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract sso {
    uint public userCount = 0;
    address owner;

    constructor() {
        owner = msg.sender;
        isAdmin[owner] = true;
    }

    struct user {
        string username;
        string email;
        string password;
        bool exist;
    }

    mapping(string => user) private usersList;
    mapping(address => user) private userOfAddress;
    mapping(address => bool) private isAdmin;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyAdmin() {
        require(isAdmin[msg.sender]);
        _;
    }

    function makeAdmin(address _address) external onlyOwner {
        isAdmin[_address] = true;
    }

    function createUser(
        string memory _username,
        string memory _email,
        string memory _password,
        address _address
    ) public onlyAdmin returns (bool) {
        if (isUserOfName(_username) || isUserOfAddress(_address)) {
            return false;
        }
        userCount++;
        usersList[_username] = user(_username, _email, _password, true);
        userOfAddress[_address] = usersList[_username];
        return true;
    }

    function validate(
        string memory _user,
        string memory _password
    ) external view returns (bool) {
        bytes memory b1 = bytes(usersList[_user].password);
        bytes memory b2 = bytes(_password);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i = 0; i < l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

    function isUserOfName(string memory _user) public view returns (bool) {
        if (usersList[_user].exist) return true;
        else return false;
    }

    function isUserOfAddress(address _address) public view returns (bool) {
        if (userOfAddress[_address].exist) return true;
        else return false;
    }

    function getusercount() public view returns (uint256) {
        return userCount;
    }

    function getUserNameByAddress(
        address _address
    ) external view returns (string memory) {
        if (isUserOfName(userOfAddress[_address].username))
            return userOfAddress[_address].username;
        else return "Not Found";
    }
}
