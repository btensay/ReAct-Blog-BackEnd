//import { Sequelize } from "sequelize/types";

const Model = Sequelize.Model;

class BlogEntry extends Model{}

const BlogEntry = sequelize.define('blogEntry', 
{
    //attributes
    blog_entry_title: {
        type: Sequelize.String, 
        allowNull: false
    }, 
    blog_entry_description: {
        type: Sequelize.String, 
        allowNull: false
    },
    date_blog_entry_added: {
        type: Sequelize.Date
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
    }
},
{
    sequelize,
    modelName: 'blogEntry'
});

module.exports = BlogEntry;