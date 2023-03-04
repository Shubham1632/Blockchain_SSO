// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract sso {
    uint public userCount = 0;
    address private owner = 0x21E12AfA5D29BDa1e19126fB8540D53E650b7587;

    struct user {
        string username;
        string email;
        string password;
        uint256 num;
    }

    mapping(string => user) private usersList;
    mapping(address => user) private userOfAddress;

    event userCreated(string alter_email, string addr, uint256 number);

    modifier onlyowner() {
        require(msg.sender == owner);
        _;
    }

    function createUser(
        string memory _username,
        string memory _email,
        string memory _password,
        string memory _addr,
        string memory _alt_email,
        uint256 _number,
        address _address
    ) public onlyowner {
        if (isUserOfName(_username) == false) {
            userCount++;
            usersList[_username] = user(_username, _email, _password, _number);
            userOfAddress[_address] = usersList[_username];
            emit userCreated(_alt_email, _addr, _number);
        }
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
        if (usersList[_user].num > 0) return true;
        else return false;
    }

    function isUserOfAddress(address _address) external view returns (bool) {
        if (userOfAddress[_address].num > 0) return true;
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

    function getinfo(string memory _user) external view returns (user memory) {
        return usersList[_user];
    }
}
