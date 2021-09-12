const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config  = require('../../config');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    typeUser: {
        type: Number,
        default: 1,
        required: true
    },
    photo: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    active: {
        type: Boolean,
        default: true
    }
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, config.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    if (!validator.isEmail(email)) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const user = await User.findOne({ email, active:true} )
        .select("-__v");

    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
}

const User = mongoose.model('User', userSchema);
module.exports = User;