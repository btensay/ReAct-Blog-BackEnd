/*
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const PORT = 4000;

//const blogentryRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());
*/
// Sequelize ORM section - start 
//const Sequelize = require('sequelize');
//let BlogEntry = require('./Sequelize.Model');

//const Model = Sequelize.Model;

//class BlogEntry extends Model{}

// Option 1: Passing parameters separately
/*const sequelize = new Sequelize('fassolor_Blogs', 'fassolor_ReBlogs_User', 'sheromeda+445', {
    host: '162.249.5.100',
    dialect: 'mssql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
 // });
//
 // const sequelize = new Sequelize('reblog', 'reblogUser', 'sheromeda+445', {
 //   host: 'blush.mysitehosted.com',
 //   dialect: 'mssql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  //  define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
   //     timestamps: false
  //    }
  //});
/*
Blog = sequelize.define('blog', 
{
    //attributes
    blog_entry_title: {
        type: Sequelize.STRING, 
        allowNull: false 
    }, 
    blog_entry_description: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    date_blog_entry_added: {
        type: Sequelize.DATE 
    }, 
    blog_entry_is_published: {
        type:Sequelize.BOOLEAN
    },
    date_blog_entry_published_date: {
        type:Sequelize.DATE
    },
    blog_entry_author: { 
        type:Sequelize.STRING
    },
    blog_entry_is_deleted: {
        type:Sequelize.BOOLEAN
    }
},
//options
{ 
    freezeTableName: true    
});
*/

//Testing the connection
/*sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
   */ //Api end points - start
        //Get all   
      /*  blogentryRoutes.route('/').get(function(req,res){            
            Blog.findAll().then(blogs => {
            console.log("All users:", JSON.stringify(blogs, null, 4));
            res.json(blogs);
          });         
        });  
        
        //Add - Create a blog entry
        blogentryRoutes.route('/add').post(function(req, res) {
            
            Blog.create({ blog_entry_title: "Test blog entry title", 
            blog_entry_description: " blog entry description" })
        .then(firstBlogEntry => {
            //res.status(200).json({'blogentry': 'blogentry added successfully'});
                console.log("The first blog entry's auto-generated ID:", firstBlogEntry.id);
            }).catch(err => {
                res.status(400).send('adding new blogentry failed');
            });                              
        });
        */
        /*   
        //Add
// Create a blog entry
/*Blog.create({ blog_entry_title: "Test blog entry title", 
              blog_entry_description: " blog entry description" })
         .then(firstBlogEntry => {
                console.log("The first blog entry's auto-generated ID:", firstBlogEntry.id);
  });*/
  
        //Delete -i.e. destroy

        //Update

    //Api end points - end
// Sequelize ORM section - end 
/*
app.use('/blogentries', blogentryRoutes);
 
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
*/

//MongoDb section - start
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogentryRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let BlogEntry = require('./blogentry.model');
mongoose.connect('mongodb://127.0.0.1:27017/reblogentries', 
{ useNewUrlParser: true, /*useUnifiedTopology: true*/ });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//Api end points - start
//module for handling files, i.e. file uploads in this instance
const multer = require('multer');
//Create an upload instance and receive multiple files
var upload = multer({storage:storage}).array('file')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

//Setup the POST route to upload a file
app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)
    })
});

//Get all blog entries
blogentryRoutes.route('/').get(function(req,res){
BlogEntry.find(function(err, blogentries){
        if(err){
            console.log(err);
        } else{
            res.json(blogentries);
        }
    });
});

//Get a blog entry by id
blogentryRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;    
    BlogEntry.findById(id, function(err, blogentry){
        res.json(blogentry);
    });
});

//Update blog entry by id
blogentryRoutes.route('/update/:id').post(function(req, res) {
    BlogEntry.findById(req.params.id, function(err, blogentry) {
        if (!blogentry)
            res.status(404).send("blog entry data is not found");
        else
            blogentry.blog_entry_description = req.body.blog_entry_description;
            blogentry.blog_entry_title = req.body.blog_entry_title;
            blogentry.save().then(blogentry => {
                res.json('blogentry updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//Add a new blog entry
blogentryRoutes.route('/add').post(function(req, res) {
    let blogentry = new BlogEntry(req.body);
    blogentry.save()
        .then(blogentry => {
            res.status(200).json({'blogentry': 'blogentry added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new blogentry failed');
        });
});

//Delete a blog entry by id
blogentryRoutes.route('/delete/:id').post(function(req, res) {
    BlogEntry.findById(req.params.id, function(err, blogentry) {
        if (!blogentry)
            res.status(404).send("blog entry data is not found");
        else
            blogentry.blog_entry_description = req.body.blog_entry_description;
            blogentry.blog_entry_title = req.body.blog_entry_title;
            blogentry.remove({"blog_entry_title": blogentry.blog_entry_title})
            .then(blogentry => {
                res.status(200).json({'blogentry': 'blogentry removed successfully'});
            }) 
            .catch(err => {
                res.status(400).send('removing blogentry failed');
            });
    });
});

app.use('/blogentries', blogentryRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

//Api end points - end
//MongoDb section - end

