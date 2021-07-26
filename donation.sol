pragma solidity 0.8.4;


contract donation{
    
    address public company_address = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    mapping (address => uint256) public address_to_id;
    mapping(uint256 => uint256) public id_to_total_donation;
    //mapping(uint256 => customer_profile) public id_to_profile;
    struct expense{
        uint256 expense_id;
        uint256 expense_amount;
        string expense_cause;
        uint256 date;
        string transaction_id;
        
    }
     mapping(uint256 => expense) public id_to_expense;
    uint256 public expenses_counter;
    

    uint256 customer_id_count;
    constructor(){
        customer_id_count = 0;
    }
    struct customer_profile{
        uint256 customer_id;
        string name;
        uint256 total_donation;
    }
    
    function make_donation(string memory _message) public payable  returns (uint256) {
        
        if(address_to_id[msg.sender] == 0){
            customer_id_count+=1;
            address_to_id[msg.sender] = customer_id_count;
            id_to_total_donation[address_to_id[msg.sender]] += ((msg.value)/(1 wei)); 
        }
        else{
            id_to_total_donation[address_to_id[msg.sender]] += ((msg.value)/(1 wei)); 
        }
        payable(company_address).transfer(msg.value);
        return ((msg.value)/(1 ether));
    }
    
    function make_expense(uint256 _amount, string memory _cause, uint256 _date, string memory _transaction_id) public payable returns(uint256){
        expenses_counter+=1;
        expense memory new_expense = expense(expenses_counter, (_amount)/(1 ether), _cause, _date, _transaction_id);
        id_to_expense[expenses_counter] = new_expense;
        return (_amount)/(1 wei);
    }
    
    
}
