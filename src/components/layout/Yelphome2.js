import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import Api from '../../utils/ApiManager';

import {Link} from 'react-router';

class Yelphome2 extends Component {
    constructor(){
        
        super()
        this.goingfunc=this.goingfunc.bind(this);
            this.state = {
                searchterm:"",
                results:[],
                username:"",
                
              
        };
    }
    componentWillMount(){
        var sterm1 = localStorage.getItem("searchterm");
        if(sterm1){
            this.setState({searchterm:sterm1})
        }
    }
    
    componentDidMount(){
        var sterm1 = localStorage.getItem("searchterm");
        console.log("inside component did mount")
        console.log("sterm1 value",sterm1)
        if(sterm1){
            console.log("sterm is here in local storage",sterm);
            //start
            
                var sterm = sterm1;
                
      
      
        Api.get('/api/yelp/' + sterm, null, (err, response) => {
            // Call above goes to ApiManager.js
            if (err) { 
                // err = { message: "Not found anything", null: null }
                console.log("error",err)
                alert("Error: " + err); 
                return;
            }
        else{
            console.log("response in front end",response.message)
            var arr1 = [];
            console.log("here's the yelp response",response.message)
            arr1 =response.message;
            this.setState({results:arr1})
            
            
        }
         
        });
            
            //end
            
            
        }
        else{
            console.log("nothing there in console log")
        }
    }
    saveusername(){
        return;
    }
    
    goingfunc(e){
        
        
       
            var username = this.state.username;
        var idtofind=e.target.id;
        
        //find index number 
                    function findWithAttr(array, attr, value) {
                for(var i = 0; i < array.length; i += 1) {
                    if(array[i][attr] === value) {
                        return i;
                    }
                }
                return -1;
            }

       
        
        //ends here
        var id = "id";
        var index1 = findWithAttr(this.state.results,id,idtofind);
        console.log("this is index",index1)
        var url ="/api/yelp/"+username;
        url = url+"/";
        url=url+idtofind;
        console.log("url is",url)
         Api.post(url, null, (err, response) => {
            // Call above goes to ApiManager.js
            if (err) { 
                // err = { message: "Not found anything", null: null }}
                console.log("error",err)
                alert("Error: " + err); 
                return;
            }
        else{
            var arr1 = [];
            console.log("this.state.results",this.state.results)
            var c1 = this.state.results[index1].going +1;
            var newres = this.state.results;
            newres[index1].going=newres[index1].going+1;
            this.setState({results:newres})
            console.log("everything went wellfrom mongodb to frontend.")
            
            
            
            
        }
         
        });
       
    }
    onvaluechange(e){
        this.setState({searchterm:e.target.value})
    }
    onusernamechange(e){
        this.setState({username:e.target.value})
    }
    
    //yelpsearchtwo starts 
      yelpsearchtwo(a){
        // 1 This fires first
        
      var sterm = a;
                
      
      
        Api.get('/api/yelp/' + sterm, null, (err, response) => {
            // Call above goes to ApiManager.js
            if (err) { 
                // err = { message: "Not found anything", null: null }
                console.log("error",err)
                alert("Error: " + err); 
                return;
            }
        else{
            console.log("response in front end",response.message)
            var arr1 = [];
            console.log("here's the yelp response",response.message)
            arr1 =response.message;
            this.setState({results:arr1})
            
            
        }
         
        });

    
    }
    
    
    //yelpsearchtwoends
    yelpsearch(e){
        // 1 This fires first
        console.log("event",e)
      var sterm = this.state.searchterm;
                  if (typeof(Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                localStorage.setItem("searchterm", sterm);
            } else {
                // Sorry! No Web Storage support..
                console.log("local storage isnt working")
            }
      
      console.log("sterm value",sterm)
        Api.get('/api/yelp/' + sterm, null, (err, response) => {
            // Call above goes to ApiManager.js
            if (err) { 
                // err = { message: "Not found anything", null: null }
                console.log("error",err)
                alert("Error: " + err); 
                return;
            }
        else{
            console.log("response in front end",response.message)
            var arr1 = [];
            console.log("here's the yelp response",response.message)
            arr1 =response.message;
            this.setState({results:arr1})
            
            
        }
         
        });

    
    }
    
    render() {
        
        var g = this.state.results.map((i,index)=>{
            console.log("here's the i",i);
            console.log("image",i.image_url);
            console.log("name",i.name);
            console.log("snippet text",i.snippet_text);
            return (
            
                 <div key={index} className="row res">
                     <div className="col-xs-3">
                     
                     <img className="img-responsive center-block" src={i.image_url} alt="Smiley face" height="100" width="100" />
                     </div>
                     <div className="col-xs-9">
                     <p>{i.name}  </p><button  id={i.id} onClick={this.goingfunc}>{i.going} going</button><br />
                     <p>{i.snippet_text}</p>
                     </div>
                 
                 
                 </div>
            
            
            )
            
        });
        console.log("state",this.state)
        console.log("g",g)
        
        return (
            <div>
            <Link to="/waste">Waste Page</Link><br />
            <Link to="/example">Example page</Link>
                <div className="fbody">
                <h2> This is yelp page </h2>
                
                
                <input value={this.state.searchterm} onChange={this.onvaluechange.bind(this)} type="text"></input><button onClick={this.yelpsearch.bind(this)} >Search</button><br /><br />
                <input value={this.state.username} onChange={this.onusernamechange.bind(this)} type="text" /><button onClick={this.saveusername.bind(this)}>save username</button>
                </div>
                <div>
                <div  className="container">
                {g}
                </div>
                </div>
        </div>
        )
    }
}

export default Yelphome2;