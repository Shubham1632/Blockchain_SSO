// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract sso {
    uint public userCount = 0;

    struct user {
        string username;
        string email;
        string password;
        uint256 num;
    }

    mapping(string => user) public usersList;

    event userCreated(string alter_email, string addr, uint256 number);

    function isuser(string memory _user) public view returns (bool) {
        if (usersList[_user].num > 0) return true;
        else return false;
    }

    function createUser(
        string memory _username,
        string memory _email,
        string memory _password,
        string memory _addr,
        string memory _alt_email,
        uint256 _number
    ) public {
        if (isuser(_username) == false) {
            userCount++;
            usersList[_username] = user(_username, _email, _password, _number);
            emit userCreated(_alt_email, _addr, _number);
        }
    }

    function getusercount() public view returns (uint256) {
        return userCount;
    }

    function getinfo(string memory _user) external view returns (user memory) {
        return usersList[_user];
    }

    function retirve(string memory _user)
        external
        view
        returns (string memory)
    {
        return usersList[_user].password;
    }
}
