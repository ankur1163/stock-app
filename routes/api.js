var express = require('express');
var router = express.Router();
var PollsCtlr = require('../controllers/PollsController');

var controllers = require("../controllers");
console.log("searching for route [api.js] ...");

router.get("/:resource/:id", function(req, res, next){
    var resource = req.params.resource;

    var id = req.params.id;
    var controller = controllers[resource];
    console.log("router get with id",id)
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.findById(id, function(err, result){
        console.log('got controller response');
        if (err) {
           // 3 This DID fire :D
           console.log('Error in api.js');
           return res.json({ confirmation: 'fail',
                message: 'Not found anything'
            });
        }
        
        // This ran as well, but later
        console.log("back in api.js")
        
        // So this was never sent, as the request had already been completed
        res.json({ confirmation: 'success',
            message: result
        }); 
    });
    
});


router.get("/:resource", function(req, res, next){
    
    var resourceFrom = req.params.resource;
    var controller = controllers[resourceFrom];
    console.log("resource name",req.params.resource)
    console.log("controller is simple",controller)
    console.log("query is ",req.query)
    console.log('inside API js,simple route - controller route' + controllers[resourceFrom]);
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.find(req.query, function(err, results){
        if (err){
                res.json({ confirmation: 'fail',
                    message: err
                });
                return;
            }
            res.json({ confirmation: 'success',
                    message: results
        });
    });

  
});
//goingfunc route 
router.post("/:resource/:username/:id", function(req, res, next){
    var resource = req.params.resource;
   var username = req.params.username;
   var id = req.params.id;
   console.log("resource in api.js",resource);
   console.log("username in api.js",username);
   console.log("id in api.js",id);
    var controller = controllers[resource];
    console.log("inside api post",req.body)
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    controller.modify(req.params, function(err, result) {
        
         if (err){
             console.log("there is some error",err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log("ok, we got the results",result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});

//goungfunc route end

router.post("/:resource", function(req, res, next){
    var resource = req.params.resource;
   
    var controller = controllers[resource];
    console.log("inside api post",req.body)
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    console.log(req.body);
    controller.create(req.body, function(err, result) {
        
         if (err){
             console.log(err);
            res.json({ confirmation: 'fail',
                message: err
            });
            return;
        }
        console.log(result);
        res.json({ confirmation: 'success',
                message: result
            });
        
    });

});

router.put("/:resource/:id", function(req, res, next){
     
    var resource = req.params.resource;
    var editpoll = req.editpoll;
    
    var id = req.params.id;
    var controller = controllers[resource]; // select a controller specified in the URL
    console.log('inside API js - controller route' + controllers[resource]);
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'Invalid resource request on POST to: ' + resource
        });
        return;
    }
    
    controller.update(id, req.body, function(err, result) { // call update function of specified ctlr
       console.log("this is editpoll value...",req.editpoll)
         if (err){
            res.json({ confirmation: 'fail',
                message: 'This is the fail from api.js: ' + err
            });
            return;
        }
        
        res.json({ confirmation: 'success',
                message: 'This is the ****SUCCESS**** from api.js' + JSON.stringify(result)
            });
        
    },editpoll);

});

router.delete("/:resource/:id", function(req, res, next){
    var resource = req.params.resource;

    var id = req.params.id;
    console.log("in api.js file",resource,id)
    var controller = controllers[resource];
    
    if (controller == null) {
        res.json({ confirmation: 'fail',
                    message: 'User made invalid resource request'
        });
        return;
    }
    
    // call the correct controller specified by the http request
    controller.delete(id, function(err, result){
           if (err){
                res.json({ confirmation: 'fail',
                    message: 'Not found'
                });
                return;
            }
            
            res.json({ confirmation: 'success.The poll got deleted',
                    message: result
                });
            
    });
    
});

module.exports = router;