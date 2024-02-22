const User = require('../models/User');

async function show(req, res) {
    console.log('GET /api/users');
    try {
        // Assuming req.id is the user's ID extracted from the JWT in a previous middleware
        const foundUser = await User.findById(req.id).select('-password'); // Exclude the password for security

        // Adjusted response to reflect potentially updated User schema attributes
        res.status(200).json({
            username: foundUser.username,
            email: foundUser.email,
            // Assuming you want to include some references to form data or other attributes
            // For example, if you have a reference to form IDs:
            forms: foundUser.forms, // This would be an array of form IDs or embedded form summaries
            // Include any other relevant user-specific information you want to expose
        });

    } catch(err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    show,
};
