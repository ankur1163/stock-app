var PollsController = require("./PollsController");
var CommentController = require("./CommentController");
var Yelpcontroller = require("./Yelpcontroller");

module.exports = {
    comment: CommentController,
    polls: PollsController,
    yelp:Yelpcontroller
};