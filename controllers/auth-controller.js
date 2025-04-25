const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// register controller
const registerUser = async (req, res) => {
    try {
        // extract user info from Request Body
        const { username, email, password, role } = req.body;
        
        // check if the user already exist in the DB
        const checkExistingUser = await User.findOne({
            $or: [ {username}, {email}, ]
        });

        if(checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exists !!!"
            });
        }

        // Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a NEW user and SAVE it in the Database
        const newlyCreatedUser = new User({
            username, email, 
            password: hashedPassword, 
            role: role || 'user',
        });
        await newlyCreatedUser.save();

        if(newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: "User registration Successful !!"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "User registration UnSuccessful !!"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something Wrong !! Please try again !!",
        });
    }
}

// login controller
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check if the current user EXISTS in the Database or not
        const user = await User.findOne({username});
        if (!user) {
            res.status(400).send({
                success: false,
                message: "Invalid credentials !!",
            });
        }
        
        // If the Password is correct OR not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).send({
                success: false,
                message: "Invalid credentials !!",
            });
        }

        // create a User token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1m'
        });
        
        // If successfull
        res.status(200).send({
            success: true,
            message: "Logged In successfully !!",
            accessToken,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something Wrong !! Please try again !!",
        });
    }
}

module.exports = { registerUser, loginUser }