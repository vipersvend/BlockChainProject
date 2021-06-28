pragma solidity ^0.8.0;

contract DCharity {
    mapping (address => uint) donated ;
    
    function donate() external payable {
     if (msg.value < 1 ether){
     revert ();
    }
     donated[msg.sender] += msg.value;
    }
    
    function donatedamt() external view returns(uint){
        return address(this).balance;
    }
    
    
    
}