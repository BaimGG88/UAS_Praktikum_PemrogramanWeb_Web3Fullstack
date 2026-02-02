// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DonationContract {
    // Struktur data donatur
    struct Donor {
        address donorAddress;
        uint256 amount;
        uint256 timestamp;
    }

    Donor[] public donors;
    uint256 public totalDonations;

    // Event agar bisa dilacak di log
    event NewDonation(address indexed donor, uint256 amount, uint256 timestamp);

    // Fungsi untuk donasi (Payable artinya bisa terima ETH)
    function donate() public payable {
        require(msg.value > 0, "Donasi harus lebih dari 0!");

        donors.push(Donor(msg.sender, msg.value, block.timestamp));
        totalDonations += msg.value;

        emit NewDonation(msg.sender, msg.value, block.timestamp);
    }

    // Fungsi untuk membaca semua data donatur
    function getDonors() public view returns (Donor[] memory) {
        return donors;
    }
}