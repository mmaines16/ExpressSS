const express = require('express');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const Post = require('./models/post');
 
mongoose.connect('mongodb://mongo:27017/specifically-sports', {server: {reconnectTries: 60, reconnectInterval: 1000}}).then(
    function() {console.log('connected to mongodb specifically-sports')}
);

var server = express();
server.use(bodyParser());
server.use(cors({origin: true}));

server.get('/', function(req, res) {
    res.sendStatus(200);
});

server.get('/api/posts', function(req, res) {
    Post.find({}, function(err, posts) {
        if (err) res.json([]);

        console.log("Posts: ", posts);

        res.json(posts);
    });
});

server.get('/api/posts/:id', function(req, res) {
    const _id = req.params['id'];

    Post.findOne({_id: _id}, function(err, post) {
        if (err) res.sendStatus(500);

        res.json(post);
    });
});

server.put('/api/posts/:id', function(req, res) {
    const _id = req.params['id'];

    console.log("------Put (posts)--------");

    var updatedPost = {
        'title': req.body.title,
        'author': req.body.author,
        'description': req.body.description,
        'delta': req.body.delta,
        'imageUrl': req.body.imageUrl != null ? req.body.imageUrl : "",
    }

    Post.updateOne({'_id': _id}, updatedPost, function(err, result) {

        if(err) res.sendStatus(500);

        console.log("Post Updated: ", result);

        res.json({response: result});
    });
});

server.post('/api/posts', function(req, res) {

    var newPost = {
        'title': req.body.title,
        'author': req.body.author,
        'category': req.body.category,
        'description': req.body.description,
        'delta': req.body.delta,
        'imageUrl': req.body.imageUrl != null ? req.body.imageUrl : "",
    }

    console.log("New Post: ", newPost);
    
    Post.create(newPost, function(err, post) {
        if (err) {
            console.log(err);
        }

        console.log('Post Created: ', post);

        res.json(post);
    });   
});

server.get('/api/posts/:id/like', function(req, res) {
    const _id = req.params['id'];

    Post.findOne({_id: _id}, function(err, post) {
        if(post==null) res.sendStatus(404);

        // Needs Validation and Authorization

        Post.updateOne(post, {likes: post.likes+1}, function(err, response) {
            res.sendStatus(200);
        });

    });
});

server.get('/api/posts/:id/unlike', function(req, res) {
    const _id = req.params['id'];

    Post.findOne({_id: _id}, function(err, post) {
        if(post==null) res.sendStatus(404);

        // Needs Validation and Authorization

        Post.updateOne(post, {likes: post.likes-1}, function(err, response) {
            res.sendStatus(200);
        });

    });
});

server.delete('/api/posts/:id', function(req, res) {
    const _id = req.params['id'];

    console.log("------Delete (posts)--------");

    Post.deleteOne({_id: _id}, function(err, post) {
        if(err) {
            console.log("Error ---> Post.deleteOne: ", err);
            res.sendStatus(500);
        }

        res.sendStatus(200);
    });
});

server.listen(5000, function() {
    console.log('listening on port 5000...');
});