const express = require('express');
const jwt = require('jsonwebtoken');
const { env: { JWT_SECRET } } = process;
const { Users } = require('../../data/models');
const router = express.Router();
const crypto = require('crypto');

//logear usuario
router.post('/users/login', async (req, res, next) => {
    const { email, username, password } = req.body;
    
    try {
        //userLoginValidation(email, password);

        const user = await Users.findOne({$or:[{email},{username}]});

        if (!user){
            throw new Error (`El usuario no se encuentra registrado.`)} 

        const hash = crypto.createHash('sha256').update(password).digest('hex');

        if(user.role !== "admin" || user.active !== true) throw new Error (`El usuario no tiene el rol para acceder`);
        
        if (user.password !== hash) throw new Error ("La constraseña ingresada es incorrecta.");
        
        const token = await jwt.sign({ sub: user._id }, JWT_SECRET, { expiresIn: "12h"});

        return res.json({ token, user: user });                
    } catch (error){
        next(error);
    }
})

module.exports = router;