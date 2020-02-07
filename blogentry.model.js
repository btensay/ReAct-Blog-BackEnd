const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogEntry = new Schema({
    blog_entry_title: {
        type: String
    }, 
    blog_entry_description: {
        type: String
    },
    date_blog_entry_added: {
        type:Date
    },
    blog_entry_is_published: {
        type:Boolean
    },
    date_blog_entry_published_date: {
        type:Date
    },
    blog_entry_author: { 
        type:String
    },
    blog_entry_is_deleted: {
        type:Boolean
    },
    imgCollection:{
        type:Array
    }
});
module.exports = mongoose.model('BlogEntry', BlogEntry);