const models = require ('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res){

    models.User.findone({where:{email:req.body.email}}).then(result =>{
        if(result){
            res.status(409).json({
                message:"Email already exists!!!"
            });
        }else{
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            messgae:"User created successfully"
                        });
                    }).catch(error => {
                        res.status(500).json({
                            messgae: "Something went Wrong..!!!"
                        });
                    });
                });
            });
        }
    }).catch(error => {

    });
}

function login(req, res){
    models.User.findone({where:{email:req.body.email}}).then(user => {
        if (user === null) {
            res.status(401).json({
                message:"Invalid cred"
            })
        }else{
            bcryptjs.compare(req.body.password, user.password, function(err, result){
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successfull!!!",
                            token: token
                        });
                    });
                }
            })
        }
    }).catch(error =>{
        res.status(500).json({
            message:"Something went Wrong...!!!!",
        })
    });
}

module.exports ={
    signUp:signUp,
    login: login
}