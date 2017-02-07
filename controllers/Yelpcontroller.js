var Comment = require("../models/Comment");
var Yelpcontroller = require("../models/yelp");
var each = require("async/each")
//import each from 'async/each';
var Yelp = require('yelp');
var forEach = require('async-foreach').forEach;
var yelp = new Yelp({
    consumer_key: 'uBGDSg8_EEgtZxw7NYieeQ',
    consumer_secret: '5ZOQL7AQvgH4d8eewiYkqgzjyNE',
    token: 'APOgQ4Wh3XJPDkFw8AmjpAjQpadEkTaH',
    token_secret: 'XgDIj9c8uiQ5CZZeR2BhEX8xTlI',
});

module.exports = {


    findById: function(id, callback) {
        var dataarray = [];
        yelp.search({
                term: 'food',
                location: id
            })
            .then(function(data) {
                var v=0;
                console.log("inside yelp controller success")
                  //new code suggested by shashank
                  console.log("we are in yelp controller, we got the data")
                  
                  
                  
                  
                  dataarray = data.businesses;
                  
                  for(var i =0;i<dataarray.length;i++){
                      Object.defineProperty(dataarray[i], 'going', {
                          value: 0,
                          writable: true,
                          enumerable: true,
                          configurable: true
                        });
                      
                  }
                  
                  //foreach async code starts 
                  forEach(dataarray, function(item, index, arr) {
                          console.log("each", item, index);
                          var i = item.id;
                           Yelpcontroller.findOne({ 'restaurantid' :  i }, function(err, rid){
                          if(err){
                              console.log("v count in err",v);
                              v++;
                              console.log("something wrong in finding restaurant id in going block")
                          }
                          else{
                              console.log("v count",v)
                              console.log("rid is",rid)
                              
                              if(rid !== null){
                                  console.log("rid usernames",rid.usernames)
                              console.log("rid usernames length",rid.usernames.length)
                              v++;
                              var count = rid.usernames.length;
                            
                              dataarray[index].going=count;
                              }
                              else if(rid===null){
                                  console.log("v count",v)
                                  console.log("dataarray length superman",dataarray.length)
                                  v++;
                                  console.log("no username field in database")
                                  if(v==dataarray.length){
                          console.log("this is v",v)
                          console.log("this is dataarray",dataarray.length)
                          console.log("final dataarray is here",dataarray)
                              callback(null,dataarray)
                          }
                              }
                              else{
                                  console.log("v count",v);
                                  v++
                                  console.log("dont know what happened")
                                  console.log("dataarray finally superman",dataarray.going)
                                  if(v===dataarray.length){
                          console.log("this is v",v)
                          console.log("this is dataarray",dataarray.length)
                          console.log("final dataarray is here",dataarray)
                              callback(null,dataarray)
                          }
                              }
                              
                              
                          }
                          
                          
                      });
                      console.log("just before final v",v)
                      if(v===dataarray.length){
                          console.log("this is v",v)
                          console.log("this is dataarray",dataarray.length)
                          console.log("final dataarray is here",dataarray)
                              callback(null,dataarray)
                          }
                        });
                 
                  console.log("in the end, here's dataarray",dataarray)

            })
            .catch(function(err) {
                callback(err, null)
                console.error(err);
            });

              console.log("end dataarray",dataarray)
    },

    modify: function(params, callback) {

        var username = params.username;
        var id = params.id;
        console.log("params", params);
        console.log("username", username);
        console.log("id", id)
         Yelpcontroller.findOne({ 'restaurantid' :  id }, function(err, rid) {
             console.log("here's rid",rid)
             if(err){
                 console.log("there is error from mongodb")
             }
             else{
                         //restaurantid
                           if(rid){
                               var newUsernames = rid.usernames;
                                newUsernames.push(username);
                              Yelpcontroller.findOneAndUpdate({ 'restaurantid': id }, { 'usernames': newUsernames }, function (err, response) {
                              if (err) {
                                console.log("error", err);
                                
                              }
                              console.log('The response from Mongo was ', response);
                              callback(null,response)
                            });
                               
                               /*
                               console.log("restaurantid found")
                        Yelpcontroller.update({ 'restaurantid' :  id },{$push: {
                                'usernames': username
                                     
                            }})
                            */
                    }
                    else{
                        console.log("restaurant id not found")
                        Yelpcontroller.create({
                        "restaurantid": id,
                        "usernames": [username]
                    })
                        
                    }
                 
             }
          
            
            });
        
        

    }



};


