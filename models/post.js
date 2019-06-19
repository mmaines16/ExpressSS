const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const PostSchema = new Schema({
 author: {type: String, required: true},
 title: {type: String, required: true},
 category: {type: String, required: true},
 delta: {type: Object, required: true, default: {ops:[]}},
 description: {type: String, required: true},
 imageUrl: {type: String, default: ""},
 dateCreated: { type: Date, default: Date.now },
 likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', PostSchema);
