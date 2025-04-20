// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract FratRank {
    address public owner;

    // Frat storage
    string[] public fratList;
    mapping(string => bool) public fratExists;
    mapping(string => uint) public votes;

    event Added(address indexed adder, string frat);
    event Voted(address indexed voter, string frat, uint votes);

    constructor() {
        owner = msg.sender;

        string[7] memory initialFrats = ["Pike", "KA", "ATO", "Phi Psi", "PKS", "Phi Tau", "Fiji"];
        for (uint i = 0; i < initialFrats.length; i++) {
            string memory frat = initialFrats[i];
            fratExists[frat] = true;
            votes[frat] = 0;
            fratList.push(frat);
        }
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function addFrat(string memory _frat) public onlyOwner {
        require(!fratExists[_frat], "Frat already exists");
        fratExists[_frat] = true;
        votes[_frat] = 0;
        fratList.push(_frat);
        emit Added(msg.sender, _frat);
    }

    function vote(string memory _frat) public {
        require(fratExists[_frat], "Frat does not exist");
        votes[_frat]++;
        emit Voted(msg.sender, _frat, 1);
    }

    function getVotes() public view returns (string[] memory, uint[] memory) {
        uint len = fratList.length;
        uint[] memory result = new uint[](len);
        for (uint i = 0; i < len; i++) {
            result[i] = votes[fratList[i]];
        }
        return (fratList, result);
    }
}
