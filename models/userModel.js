import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email ID"],
        unique: [true, "This email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: 6
    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.methods.comparePassword = async function(recievedPassword){
    return await bcrypt.compare(recievedPassword,this.password);
};

export default mongoose.model("User", userSchema);