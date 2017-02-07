import superagent from 'superagent';

//var mongo = require('mongodb').MongoClient


export default {
    get: (url, params, callback) => {
        superagent
			.get(url)
			.query(params)
			.set('Accept', 'application/json')
			.end(function(err, response) {
				if (err) { 
					console.log("error in api manager")
					return callback(err);
				}

				const confirmation = response.body.confirmation;
				
				console.log("response", response);
				console.log('Confirmation in api manager: ', confirmation);
				
				if (confirmation !== 'success') {
					// So we end up in here
				    // send a failure message
				    console.log("landed in failure api manager")
				    return callback({message:response.body.message, null});
				}
				
				console.log('passing response body back to callee', response.body);
				callback(null, response.body);
			});
    },
    post: (url, body, callback) => {
        superagent
            .post(url)
            .send(body)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) { 
                	console.log("error in api manager after returning",err);
				    callback(err, null);
				    return;}
				// here check for API failures
				const confirmation = response.body.confirmation;
				if (confirmation != 'success') {
				    // send a failure message
				    
				    console.log("no error from mongodb but confirmation is not success")
				    callback({message:response.body.message, null});
				    return;
				}
				console.log("everything went well")
				callback(null, response.body);
            })
        
    },
    put: (url,body,callback,editpoll) => {  // Api.put('/api/polls/' + pollId, newVotesObj, (err, response) => {
		console.log("apimanager value of editpoll",editpoll)
    	superagent
            .put(url)
            .set('Accept', 'application/json')
            .send(body)
            .send({editpoll:editpoll})
            .end((err, response) => {
                if (err) { 
                	console.log('SuperAgent PUT error= ' + err);
                	
				    callback(err, null);
				    return;}
				// here check for API failures
				const confirmation = response.body.confirmation;
				if (confirmation != 'success') {
				    // send a failure message
				    console.log('SuperAgent PUT failed');
				    callback({message:response.body.message, null});
				    return;
				}
				console.log('SuperAgent worked!');
				callback(null, response.body);
            })
        // check console log and this get's called:
        // It does not reach the .end callback
        console.log('SuperAgent... what happened?');
    },
    del: (url,params,callback) => {
    	superagent
            .del(url)
            .send(params)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) { 
                	console.log(err);
				    callback(err, null);
				    return;}
				// here check for API failures
				const confirmation = response.body.confirmation;
				if (confirmation != 'success') {
				    // send a failure message
				    callback({message:response.body.message, null});
				    return;
				}
				callback(null,null);
            })
        
    }
    /*,
    update: (url,body,callback) => { 
    

		var dbUrl = 'mongodb://asjb:326382l@ds053718.mlab.com:53718/fcc-polls';
		mongo.connect(url, function(err, db) {
		  if (err) throw err
		  var collection = db.collection('fcc-polls')
		  collection.update({
		    _id: 'tinatime'
		  }, {
		    $set: {
		      age: 40
		    }
		  }, function(err) {
		    if (err) throw err
		    db.close()
		  })
		})
    }*/
}