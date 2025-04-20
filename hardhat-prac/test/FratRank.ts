import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { ethers } from "hardhat";

describe("FratRank", function () {
  async function deployFratRankFixture() {
    const [owner, voter] = await ethers.getSigners();
    const FratRank = await ethers.getContractFactory("FratRank");
    const contract = await FratRank.deploy();
    return { contract, owner, voter };
  }

  describe("Deployment", function () {
    it("Should set deployer as the owner", async function () {
      const { contract, owner } = await deployFratRankFixture();
      expect(await contract.getOwner()).to.equal(owner.address);
    });

    it("Should initialize default frats", async function () {
      const { contract } = await deployFratRankFixture();
      const allVotes = await contract.getVotes();
      expect(allVotes[0].length).to.be.greaterThan(0);
    });
  });

  describe("Voting", function () {
    it("Should increase vote count for a frat", async function () {
      const { contract } = await deployFratRankFixture();
      await contract.vote("Pike");
      const [frats, votes] = await contract.getVotes();
      const index = frats.findIndex((name: string) => name === "Pike");
      expect(votes[index]).to.equal(1);
    });

    it("Should emit Voted event", async function () {
      const { contract, voter } = await deployFratRankFixture();
      await expect(contract.connect(voter).vote("KA"))
        .to.emit(contract, "Voted")
        .withArgs(voter.address, "KA", 1);
    });

    it("Should revert if voting for non-existent frat", async function () {
      const { contract } = await deployFratRankFixture();
      await expect(contract.vote("NotReal")).to.be.revertedWith("Frat does not exist");
    });
  });

  describe("Add Frat", function () {
    it("Should allow only owner to add a frat", async function () {
      const { contract, owner, voter } = await deployFratRankFixture();
      await expect(contract.connect(voter).addFrat("NewFrat")).to.be.revertedWith("You are not the owner.");
      await expect(contract.connect(owner).addFrat("NewFrat")).to.emit(contract, "Added");
    });

    it("Should not allow duplicate frat names", async function () {
      const { contract } = await deployFratRankFixture();
      await expect(contract.addFrat("Pike")).to.be.revertedWith("Frat already exists");
    });
  });
});

