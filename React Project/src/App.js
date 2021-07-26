import "./styles.css";
import Web3 from 'web3';
import {useState} from 'react';
var Contract = require('web3-eth-contract');
Contract.setProvider('http://localhost:8545');
import Donation from './Donation.json'
import { react } from "@babel/types";
//let web3 = new Web3("http://127.0.0.1:7545")
async function initializeWeb3(){
  if(window.ethereum){
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3){
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else{
    window.alert('No Ethereum Provider detected!')
  }
}

async function loadBlockChainData(){
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
  //alert(accounts)
  // Donation
  // donation 
  const networkId = await web3.eth.net.getId()
  const NetworkData = Donation.networks[networkId]

  if (NetworkData){

    const donation = new web3.eth.Contract(Donation.abi, NetworkData.address)
    const company_addr = await donation.methods.company_address().call()

    //const total_donated = await donation.methods.customer_id_count().call()
    donation.methods.customer_id_count().call().then((res)=>{
      console.log(res)
      for(let iter = 0; iter < res; iter+=1){
        console.log('Inner Loop')
      }
    })
    //console.log(total_donated)
    //const donation_result = await donation.methods.make_donation('Hi this is msg').send({ from: accounts[0], value:web3.utils.toWei('0.5', "ether") }).on('error',(error, receipt) =>{console.log('ERROR: ', error); return receipt} )
    //console.log(donation_result)
    console.log('Company Address is: ', company_addr)
  }else{
    window.alert('Donation Contract Not Deployed!')
  }
  
}


export default function App() {
  initializeWeb3()
  loadBlockChainData()
  return (
    <div className="App">
      <Application/>

    </div>
  );
}

function Application(){
  
  var [donor_name, updateName] = useState("")
  var [donation_amount, updateAmount] = useState(0)
  async function makePayment(){

  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  console.log(accounts)
  //alert(accounts)
  // Donation
  // donation 
  const networkId = await web3.eth.net.getId()
  const NetworkData = Donation.networks[networkId]

  if (NetworkData){

    const donation = new web3.eth.Contract(Donation.abi, NetworkData.address)
    const company_addr = await donation.methods.company_address().call()
    const donation_result = await donation.methods.make_donation(donor_name).send({ from: accounts[0], value:web3.utils.toWei(String(donation_amount), "ether") }).on('error',(error, receipt) =>{console.log('ERROR: ', error); return receipt} )
    console.log(donation_result)
    //console.log('Company Address is: ', company_addr)
  }else{
    window.alert('Donation Contract Not Deployed!')
  }
  

    console.log('I was called')

  }
  return(
   
<div>
<div>
  <nav className="navbar navbar-light navbar-expand bg-light navigation-clean">
    <div className="container"><a className="navbar-brand" href="#">Crypto-Donation</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1" />
      <div className="collapse navbar-collapse" id="navcol-1"><a className="btn btn-primary ml-auto" role="button" href="#">Sign In</a></div>
    </div>
  </nav>
  <header className="masthead text-white text-center" style={{background: 'url("assets/img/bg-masthead.jpg")no-repeat center center', backgroundSize: 'cover', paddingBottom: 80, paddingTop: 80}}>
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-xl-9 mx-auto">
          <h1 className="mb-5" style={{marginBottom: 0}}><strong>Raise funds</strong><br /><em>for a cause</em><br />Crypto-Donation Fundraisers<br /><br /></h1>
        </div>
        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
          <form>
            <div className="form-row">
              <div className="col-12 col-md-9 col-xl-12 mb-2 mb-md-0"><input className="form-control form-control-lg" type="text" value = {donor_name}  onChange = {(e)=>{updateName(e.target.value)}} placeholder="Enter Name" /></div>
            </div>

            <div className="form-row" style={{marginTop: 20}}>
              <div className="col-12 col-md-9 col-xl-12 mb-2 mb-md-0"><input className="form-control" type="number" placeholder="Amount (ETH)" value = {donation_amount} onChange = {(e)=>{ isNaN(e.target.value)?alert('Only Numerical Inputs Accepted'):updateAmount(e.target.value);}} /></div>
            </div>
            <div className="form-row" style={{marginTop: 20}}>
              <div className="col col-12"><button className="btn btn-primary col-5" type="button" onClick = {()=> {makePayment()}} >Donate</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </header>
  <section className="showcase">
    <div className="container-fluid p-0">
      <div className="row no-gutters">
        <div className="col-lg-6 order-lg-2 text-white showcase-img" style={{backgroundRepeat: 'no-repeat', background: 'url("https://give-marketplace.s3.ap-south-1.amazonaws.com/static/images/home/homeTemp/start-fundraiser-desktop.jpg")'}}><span /></div>
        <div className="col-lg-6 my-auto order-lg-1 showcase-text">
          <h2>Our Mission</h2>
          <p className="lead mb-0"><br />Giving collective that enables both individuals and organizations to respond together to crisis.<br /><br /></p>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col-lg-6 text-white showcase-img" style={{borderImageRepeat: 'no-repeat', backgroundRepeat: 'no-repeat', background: 'url("https://give-marketplace.s3.ap-south-1.amazonaws.com/static/images/home/homeTemp/vinod-khosla.jpg")'}}><span /></div>
        <div className="col-lg-6 my-auto order-lg-1 showcase-text">
          <h2>Dr. Vinod Chawla</h2>
          <p className="lead mb-0">People often wonder where the money would go. I can tell you, I started working with GiveIndia when the pandemic first broke a year ago. We validate them, it’s a very good, reliable organization.&nbsp;</p>
        </div>
      </div>
    </div>
  </section>
  <section className="testimonials text-center bg-light">
    <div className="container">
      <h2 className="mb-5">Our Donors</h2>
      <div className="row">
        <div className="col-lg-4">
          <div className="mx-auto testimonial-item mb-5 mb-lg-0"><img className="rounded-circle img-fluid mb-3" src="assets/img/testimonials-1.jpg" />
            <h5>Margaret E.</h5>
            <p className="font-weight-light mb-0">560 CRD</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mx-auto testimonial-item mb-5 mb-lg-0"><img className="rounded-circle img-fluid mb-3" src="assets/img/testimonials-2.jpg" />
            <h5>Fred S.</h5>
            <p className="font-weight-light mb-0">130 CRD<br /></p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mx-auto testimonial-item mb-5 mb-lg-0"><img className="rounded-circle img-fluid mb-3" src="assets/img/testimonials-3.jpg" />
            <h5>Sarah W.</h5>
            <p className="font-weight-light mb-0">1500 CRD</p>
          </div>
        </div>
      </div>
    </div>
  </section>
<div>
  <div className="container">
    <h2 style={{marginTop: 52, marginLeft: 34, fontFamily: '"Open Sans", sans-serif', fontSize: 22, fontWeight: 800,  color: 'rgb(0,0,0)'}}>Recent Spendings</h2>
    <div className="cust_bloglistintro">
      <p style={{marginLeft: 34, color: 'rgba(255,255,255,0.5)', fontSize: 14}} />
    </div>
    <div className="row">
      <div className="col-md-4 cust_blogteaser" style={{paddingBottom: 20, marginBottom: 32}}><a href="#"><img className="img-fluid" style={{height: 'auto', background: 'url("https://en.wikipedia.org/wiki/Receipt#/media/File:ReceiptSwiss.jpg")'}} src="assets/img/2021-07-05_06h15_38.png" /></a>
        <h3 style={{textAlign: 'left', marginTop: 20, fontFamily: '"Open Sans", sans-serif', fontSize: 18, marginRight: 0, marginLeft: 24,  letterSpacing: 0, fontStyle: 'normal', fontWeight: 'bold'}}>250 CRD<br /></h3>
        <p className="text-secondary" style={{textAlign: 'left', fontSize: 14, fontFamily: '"Open Sans", sans-serif',  color: 'rgb(9,9,10)', marginLeft: 24}}>Maharashtra Fundraiser Campaign</p><a className="h4" href="#"><i className="fa fa-arrow-circle-right" style={{marginLeft: 23}} /></a></div>
      <div className="col-md-4 cust_blogteaser" style={{paddingBottom: 20, marginBottom: 32}}><a href="#"><img className="img-fluid" style={{height: 'auto'}} src="assets/img/2021-07-05_06h16_43.png" /></a>
        <h3 style={{textAlign: 'left', marginTop: 20, fontFamily: '"Open Sans", sans-serif', fontSize: 18, marginRight: 0, marginLeft: 24,  letterSpacing: 0, fontStyle: 'normal', fontWeight: 'bold'}}>1500 CRD<br /></h3>
        <p className="text-secondary" style={{textAlign: 'left', fontSize: 14, fontFamily: '"Open Sans", sans-serif',  color: 'rgb(9,9,10)', marginLeft: 24}}>Donations Local Orphanage</p><a className="h4" href="#"><i className="fa fa-arrow-circle-right" style={{marginLeft: 23}} /></a></div>
      <div className="col-md-4 cust_blogteaser" style={{paddingBottom: 20, marginBottom: 32}}><a href="#"><img className="img-fluid" style={{height: 'auto'}} src="assets/img/2021-07-05_06h17_42.png" /></a>
        <h3 style={{textAlign: 'left', marginTop: 20, fontFamily: '"Open Sans", sans-serif', fontSize: 18, marginRight: 0, marginLeft: 24,  letterSpacing: 0, fontStyle: 'normal', fontWeight: 'bold'}}>700 CRD<br /></h3>
        <p className="text-secondary" style={{textAlign: 'left', fontSize: 14, fontFamily: '"Open Sans", sans-serif',  color: 'rgb(9,9,10)', marginLeft: 24}}>Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id. </p><a className="h4" href="#"><i className="fa fa-arrow-circle-right" style={{marginLeft: 23}} /></a></div>
    </div>
  </div>
</div>

  <section className="call-to-action text-white text-center" style={{background: 'url("assets/img/bg-masthead.jpg") no-repeat center center', backgroundSize: 'cover'}}>
    <div className="overlay" />
    <div className="container">
      <div className="row">
        <div className="col-xl-9 mx-auto">
          <h2 className="mb-4">Ready to get started? Sign up now!</h2>
        </div>
        <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
          <form>
            <div className="form-row">
              <div className="col-12 col-md-9 mb-2 mb-md-0"><input className="form-control form-control-lg" type="email" placeholder="Enter your email..." /></div>
              <div className="col-12 col-md-3"><button className="btn btn-primary btn-block btn-lg" type="submit">Sign up!</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <footer className="footer bg-light">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 my-auto h-100 text-center text-lg-left">
          <ul className="list-inline mb-2">
            <li className="list-inline-item"><a href="#">About</a></li>
            <li className="list-inline-item"><span>⋅</span></li>
            <li className="list-inline-item"><a href="#">Contact</a></li>
            <li className="list-inline-item"><span>⋅</span></li>
            <li className="list-inline-item"><a href="#">Terms of &nbsp;Use</a></li>
            <li className="list-inline-item"><span>⋅</span></li>
            <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
          </ul>
          <p className="text-muted small mb-4 mb-lg-0">© Brand 2021. All Rights Reserved.</p>
        </div>
        <div className="col-lg-6 my-auto h-100 text-center text-lg-right">
          <ul className="list-inline mb-0">
            <li className="list-inline-item"><a href="#"><i className="fa fa-facebook fa-2x fa-fw" /></a></li>
            <li className="list-inline-item"><a href="#"><i className="fa fa-twitter fa-2x fa-fw" /></a></li>
            <li className="list-inline-item"><a href="#"><i className="fa fa-instagram fa-2x fa-fw" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>

</div>

  )
}
