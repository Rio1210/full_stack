const express = require('express');

const router = express.Router();
const {check, validationResult} = require('express-validator');

const gravatar = require('gravatar');

const User = require('../../../models/user');




router.post('/', [check('name', 'name is required ').isLength({ min: 3 }),
    check('email').isEmail(), check('password', 'password should >=6 ').isLength({ min: 6 })], async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    //email exist
    const {name, email, password} = req.body;
    
    //should use async, if not, email will always show exist
    let user = await User.findOne({email});
    
        
    
    if(user) {
        
        return res.status(400).json({errors: [{msg: "email is exist"}]})
    }
    // const avatar = gravatar.url(email, {
    //     s:"202",
    //     r:'pg',
    //     d:'mm'
    // })
    
    //did not do password hash bcrypt
    
    user = new User({
        name,
        email,
        password
    })
    
    
    user.save();
    res.send('User reg')

});




module.exports = router;

