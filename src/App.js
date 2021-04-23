import React, { Component } from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle } from "reactstrap";


var Home = () => {
  
  return (
    <div>
    

      <h1>Welcome</h1>
      <button> <Link to= "/posts" className="button">Click to see user list</Link> </button>
      
    </div>
  );
};

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],

    };
  }

    async showList() {
    var {data} = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
   //console.log(data)
   this.setState({users: data, username: 'hello'})
   console.log(this.state.users)
   console.log(this.state.clickz)


  }
  

sendMess = val => {
  console.log(val)
  
  this.props.history.push(`/comments/${val}`);



}
  componentDidMount(){
    this.showList()
    
  }

render(){
  return (
    <div>
      <p>List</p>

    
     
     {

     this.state.users.map( ({id,username,address, email}) => {
       return(
        <div key={id}>        
        <Card className="card">
        <CardBody >
          <CardTitle tag="h2" className = 'text'>Username: {username}</CardTitle>
          <CardSubtitle tag="h3" className = 'text'>User ID: {id}</CardSubtitle>
          <CardText className = 'text'><b>Address:</b><br/>{address.suite}, {address.street}, {address.city},<br/> Zipcode: {address.zipcode} </CardText>
          <CardText className = 'text'><b>Email Id:</b> {email}</CardText>
        <button className="text btn" value={id} onClick = {e => this.sendMess(e.target.value)}> Click to see company details </button>
          <br/>
        </CardBody>
      </Card><br/>

        </div>
     )})      }



      </div>
  )}
};



class Comments extends Component{

  constructor(props) {
    super(props); 
    this.state={
    namez: [],
    others: []
    }

    }



  async componentDidMount(){
      var url = this.props.match.params.userID
    var {data} = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${url}`
    );
  
   this.setState({namez:data.company, others: data})
 
  
  }

render(){
  return  ( 
    
  <div>
  {console.log(this.state.namez,this.props)}
   {this.state.namez==''? 
   
      <div>
   <p>No Data</p>
   <Link to='/posts'><button>Go back to posts</button></Link>
   
   </div>
   
  : 
  
  <Card className="card">
        <CardBody >
        <CardSubtitle tag="h3" className = 'text'>User Details</CardSubtitle>
        <CardText className = 'text'>
        <b>User ID:</b><br/> {this.state.others.id} <br/><br/>
        <b>Username:</b><br/> {this.state.others.username} 
        </CardText>
        <hr/>
          <CardSubtitle tag="h3" className = 'text'>Company Details</CardSubtitle>
          <CardText className = 'text'>
         <b>Company Name:</b><br/> {this.state.namez.name} <br/><br/> <b>Mission:</b><br/># {this.state.namez.catchPhrase} <br/>
         # {this.state.namez.bs} <br/><br/>
           <b>Phone:</b><br/> {this.state.others.phone} <br/><br/>
           <b>Website:</b><br/> {this.state.others.website} <br/><br/>
          </CardText>
        </CardBody>
      </Card> 

   }
   
   
   </div>
  )
 

}
};



export default class App extends React.Component {

    render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/posts" component={Posts} />
         <Route exact path="/comments" component={Comments} />
         <Route exact path="/comments/:userID" component={Comments} />
      </BrowserRouter>
    );

}}
