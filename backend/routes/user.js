const UserAccounts = require('../models/UserAccounts');
const router = express.Router();
const User = require('../../models/UserAccount');

router.post('/login', function(req, res) {
    const {
        password
    } = body;
    let {
        email
    } = body;
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    email = email.toLowerCase();
    email = email.trim();
    UserAccounts.find({
        email: email
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        // Otherwise correct user
        return res.send({
            success: true,
            message: 'Valid sign in',
            userID: user._id,
        });
    });
}