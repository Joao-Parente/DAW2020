//Paragraph controller

var mongoose = require('mongoose')
var User = require('../models/user')

//Returns para list
module.exports.list = function (){
    return User.find().exec()
}

// Returns a paragraph record
module.exports.lookUp = function(id){
    return User.findOne({id:id}).exec()
}

//Inserts a new paragrapgh
module.exports.insert = function(p){
    console.log(JSON.stringify(p))
    var newUser = new User(p)
    return newUser.save()
}

// Removes one paragraph
module.exports.remove = function(id){
    return User.deleteOne({id:id})
}

// Edit one paragrapgh
module.exports.edit = function(id,p){
    return User.findByIdAndUpdate(id,p,{new:true}) //true retorna o que acabei de mandar , false o que estava la
}