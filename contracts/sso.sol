// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract sso {
    uint public userCount = 0;

    mapping(string => user) public usersList;

    struct user {
        string username;
        string email;
        string password;
    }

    event userCreated(string alter_email, string addr, uint256 number);

    function createUser(
        string memory _username,
        string memory _email,
        string memory _password,
        string memory _addr,
        string memory _alt_email,
        uint256 _number
    ) public {
        userCount++;
        usersList[_username] = user(_username, _email, _password);
        emit userCreated(_alt_email, _addr, _number);
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
