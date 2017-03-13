import React, { Component } from 'react'
//import Zones from '../containers/Zones'
import Api from '../../utils/ApiManager';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import io from "socket.io-client";
var d3= require("d3");
var ChartistGraph = require('react-chartist')
import {Line} from 'react-chartjs-2';
var forEach = require('async-foreach').forEach;
var moment = require('moment');
import MyChart from "./MyChart.js";


class Yelphome extends Component {
    constructor(){
        
        super()
             
              
        
            this.state = {
                messagewrite:"yes",
                messages:[],
                
                fdata:[],
                ddata:[],
                chartjs:[],
                i:0
              
        };
    }
    componentWillMount(){
        //new code starts 
         
       
        
        
        //new code ends
       
      
         
    }
    
    componentDidMount(){
        
        
       
       window.socket = io("/");
       var tarray;
       
       
        window.socket.on('chat message', (msg)=>{
            tarray = this.state.messages;
            tarray.push(msg);
            this.setState({messages:tarray,messagewrite:msg.body})
            this.rchart(msg.body);
        });
  

      //new code
        window.socket.on('delete message', (msg)=>{
            console.log("delete message arrived",msg)
            this.handledeletetwo(msg.body)
             
        });
        //new code ends
    }
    
    rchart(a){
        //console.log("rchart function message body",a);
         var ed = moment(new Date()).format("YYYY-MM-DD");
       var sd = moment(new Date()).subtract(1,"year").format("YYYY-MM-DD");
       var item = this.state.messages[this.state.messages.length-1].body;
              var tarr =[]
              //console.log("ed is",ed)
              //console.log("sd is",sd)
              d3.json(`https://www.quandl.com/api/v3/datasets/WIKI/${item}.json?column_index=4&start_date=${sd}&end_date=${ed}&collapse=monthly&api_key=pFtz8ExKLGsS3MpKJWnN`, (data)=> {
               
               //console.log("data from api",data.dataset.data)
               var apidata = data.dataset.data;
               var datearray = [];
               for(var i=0;i<data.dataset.data.length;i++){
                   
                  
                   datearray.push(apidata[i][0])
                   
               }
               
               var dataarray =[];
               for(var i=0;i<data.dataset.data.length;i++){
                   
                   //console.log("data is",apidata[i][1])
                   dataarray.push(data.dataset.data[i][1])
               }
               if(this.state.fdata.length===0){
                   var garray = [];
                   garray.push(dataarray);
                   this.setState({ddata:datearray,fdata:garray})
               }
               else{
                   var previousdataarray = this.state.fdata;
                previousdataarray.push(dataarray)
                this.setState({ddata:datearray,fdata:previousdataarray})
                   return;
               }
               
                
            });
        
        
    }
    handlemessage=event=>{
        
        this.setState({messagewrite:event.target.value})
        
    }
    
    handledeletetwo(x){
         console.log("remote delete occuring",x);
         var id ;
         for(var i =0;i<this.state.fdata;i++){
             if(this.state.fdata[i].body===x){
                 id =i;
             }
             
             
         }
         
          var mt =this.state.messages;
       var selected = mt[id];
       var dd = this.state.fdata;
       
       mt.splice(id,1);
       dd.splice(id,1);
       
       this.setState({messages:mt,fdata: dd}, () => {
           // setState is async 
        console.log("after deleting",this.state.fdata);   
             
       })
         
         
         
         /*
       
       var id = e.target.id;
       var mt =this.state.messages;
       var selected = mt[id];
       var dd = this.state.fdata;
             
       console.log("b4 mt dd ===>>", this.state.messages, this.state.fdata);
       mt.splice(id,1);
       dd.splice(id,1);
       
       this.setState({messages:mt,fdata: dd}, () => {
           // setState is async 
        console.log("after deleting",this.state.fdata);   
             
       })
       
       //new code
       var theMsg = this.state.messagewrite;   
       console.log("this is mt",mt)
       console.log("selected symbol stock",selected);
       window.socket.emit('delete message', selected);
       // add a console.log on this line to see if it makes it through the previous lines
       //new code ends
      console.log("delete message emitted")
      
      */
        
    }
   
   handledelete(e){
       console.log("delete button clicked")
       
       var id = e.target.id;
       var mt =this.state.messages;
       var selected = mt[id];
       var dd = this.state.fdata;
             
       console.log("b4 mt dd ===>>", this.state.messages, this.state.fdata);
       mt.splice(id,1);
       dd.splice(id,1);
       
       this.setState({messages:mt,fdata: dd}, () => {
           // setState is async 
        console.log("after deleting",this.state.fdata);   
             
       })
       
       //new code
       var theMsg = this.state.messagewrite;   
       console.log("this is mt",mt)
       console.log("selected symbol stock",selected);
       window.socket.emit('delete message', selected);
       // add a console.log on this line to see if it makes it through the previous lines
       //new code ends
      console.log("delete message emitted")
   }
   handleSubmit=event=>{
       //d3 request 
       var symb = this.state.messagewrite;
       
    
      
       var tex = this.state.messagewrite;
       
        var mess1 = [];
        // I think this should be replaced by getDefaultProps
        // if you want to set a default stock symbol
       
        mess1=this.state.messages
        var theMsg = {body:tex,from:"me"};
        mess1.push(theMsg);
        
        
        
        
        this.setState({messages:mess1})
       
        window.socket.emit('chat message', theMsg);
        
        var ed = moment(new Date()).format("YYYY-MM-DD");
       var sd = moment(new Date()).subtract(1,"year").format("YYYY-MM-DD");
       var item = this.state.messages[this.state.messages.length-1].body;
              var tarr =[]
              //console.log("ed is",ed)
              //console.log("sd is",sd)
              d3.json(`https://www.quandl.com/api/v3/datasets/WIKI/${item}.json?column_index=4&start_date=${sd}&end_date=${ed}&collapse=monthly&api_key=pFtz8ExKLGsS3MpKJWnN`, (data)=> {
               
               //console.log("data from api",data.dataset.data)
               var apidata = data.dataset.data;
               var datearray = [];
               for(var i=0;i<data.dataset.data.length;i++){
                   
                  
                   datearray.push(apidata[i][0])
                   
               }
               
               var dataarray =[];
               for(var i=0;i<data.dataset.data.length;i++){
                   
                   //console.log("data is",apidata[i][1])
                   dataarray.push(data.dataset.data[i][1])
               }
               if(this.state.fdata.length===0){
                   var garray = [];
                   garray.push(dataarray);
                   this.setState({ddata:datearray,fdata:garray})
               }
               else{
                   var previousdataarray = this.state.fdata;
                previousdataarray.push(dataarray)
                this.setState({ddata:datearray,fdata:previousdataarray})
                   return;
               }
               
                
            });
   }
    
              
    
    render() {
        
        //
        ////console.log("this is fdata",this.state.fdata);
        ////console.log("this is ddata",this.state.ddata);
        
        const data = {
  labels: this.state.ddata,
  datasets: this.state.fdata
};
        
        //<Line data={data} />
          
 
        
       const messagesrender = this.state.messages.map((message,index)=>{
          return (
              <div key={index}>
              <p key={index}><b>{message.from}:</b>{message.body}</p><button key={index+100} id={index} onClick={this.handledelete.bind(this)}  >Delete {message.body}</button><br />
              </div>
           )
       });
        if(this.state.messages[0]) {
         var newm = this.state.messages[0].body;
         
         var ty =this.state.messages[this.state.messages.length-1].body;
         var ficount= this.state.messages.length;
            
        }
         
         //console.log("ty",ty)
        return (
            <div>
            chat application <br />
            <MyChart datedate={this.state.ddata} datadata={this.state.fdata} messages={this.state.messages}/>
            <br/>
            <p>{newm}</p>
             
            
            <input type="text" ref="text" placeholder="enter a message" onChange={this.handlemessage} /><button onClick={this.handleSubmit.bind(this)}>Submit</button>
            {messagesrender}
            </div>
            
        )
    }
}

export default Yelphome;


