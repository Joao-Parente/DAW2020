// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}


module.exports.edit = student => {
    return Student 
    .updateOne({numero: student.numero}, {$set: {nome: student.nome, git: student.git, tpc: student.tpc}})
    .exec()
} 


module.exports.remove = id => {
    
    return Student.deleteOne({numero: id})
                  .exec()
}