const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    try {
        // Check if authorization header exists and starts with 'Bearer'
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];

                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                // Get user from database (exclude password)
                req.user = await User.findById(decoded.id).select('-password');

                if (!req.user) {
                    res.status(401).json({
                        success: false,
                        message: 'User not found'
                    });
                    return;
                }

                next();
            } catch (error) {
                console.error('Token verification error:', error);
                res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'No authorization token provided'
            });
        }
    } catch (error) {
        console.error('Authentication middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

// Middleware to check if user is admin
const admin = async (req, res, next) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({
                success: false,
                message: 'Not authorized as admin'
            });
        }
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Admin authorization failed'
        });
    }
};

// Optional: Middleware to check if user owns the resource
const checkOwnership = (model) => async (req, res, next) => {
    try {
        const resource = await model.findById(req.params.id);
        
        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        // Check if the logged-in user owns the resource
        if (resource.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this resource'
            });
        }

        req.resource = resource;
        next();
    } catch (error) {
        console.error('Ownership check error:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking resource ownership'
        });
    }
};

// Generate JWT Token helper function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Token expires in 30 days
    });
};

module.exports = {
    protect,
    admin,
    checkOwnership,
    generateToken
};