const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentModel = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "Email is required"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: true,
            select: false,
            minLength: [6, "Password must be at least 6 characters"],
            maxLength: [20, "Password must be at least 20 characters"],
            // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,20}$/, "Password must contain at least one number, one lowercase letter, one uppercase letter, one special character and at least 6 characters"]
        },
        
    }, {timestamps: true}
)

studentModel.pre("save", function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
}) 

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password);
} 

const Student = mongoose.model('student', studentModel);

module.exports = Student;