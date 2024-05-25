const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require("../model/user.model.js"); 

const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        console.log('Registering user:', { fullname, email, password });

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 11);
        console.log('Hashed Password:', hashedPassword);

        const newUser = new User({ fullname, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Server error:', error); // Log the error
        res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim(); // Trim email

        console.log('Login request:', { email, password });

        const existingUser = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } }); 
        console.log('Existing User:', existingUser);

        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Log the hashed password stored in the database
        console.log('Stored Hashed Password:', existingUser.password);

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        console.log('Password Correct:', isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: existingUser._id, email: existingUser.email, username: existingUser.username } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};



const logout = (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        console.error('Get All Users error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { register, login, logout, getAllUsers };
