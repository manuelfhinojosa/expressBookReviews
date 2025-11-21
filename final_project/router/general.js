const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get the book list available in the shop
/*public_users.get('/', function(req,res){
    Promise.resolve(books).then((data)=>{
        res.send(JSON.stringify(data,null,4));
    }).catch((err)=>{
        res.status(500).send({error:'Something went wrong', details: err});
    });
});*/

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    res.send(books[isbn]);
 });

 // Get book details based on ISBN
 /*public_users.get('/isbn/:isbn', function(req, res){
    const isbn = req.params.isbn;
    new Promise((resolve, reject)=> {
        const book = books[isbn];
        if(book){
            resolve(book);
        } else{
            reject("Book not found");
        }
    }).then((book)=>{
        res.send(book);
    }).catch((err)=>{
        res.status(404).send({error: err});
    });
 });*/
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
    const targetauthor = req.params.author;
  let book = Object.values(books);
  const targetbook = book.filter(book => book.author === targetauthor);

    res.send(targetbook);
});

// Get book details based on author
/*public_users.get('/author/:author', function(req, res){
    const targetauthor = req.params.author;

    new Promise((resolve, reject)=> {
        const allbooks = Object.values(books);
        const targetbook = allbooks.filter(book => book.author === targetauthor);

        if(targetbook.length > 0){
            resolve(targetbook);
        } else{
            reject("No books found for this author");
        }
    }).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        res.status(404).send({error: err});
    });
});*/

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
    const targettitle = req.params.title;
  let book = Object.values(books);
  const targetbook = book.filter(book => book.title === targettitle);

    res.send(targetbook);
});

// Get all books based on title
/*public_users.get('/title/:title', function(req, res){
    const targettitle = req.params.title;

    new Promise((resolve, reject)=> {
        const allbooks = Object.values(books);
        const targetbook = allbooks.filter(book => book.title === targettitle);

        if(targetbook.length > 0){
            resolve(targetbook);
        } else{
            reject("No books found with this title");
        }
    }).then((books)=>{
        res.send(books);
    }).catch((err)=>{
        res.status(404).send({error: err});
    });
});*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
