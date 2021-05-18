const bycrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const client = require("../config/db");

exports.signUp =  (req,res) => {
    const {name, email, password} = req.body;
    //IF user aldready exists
    client.query(`SELECT * FROM users WHERE email = '${email}'`).then(async (data) => {
        // console.log(data);
        if(data.rowCount > 0){
            res.status(400).json({
                message : "User exists"
            })
        }else{
        //Generate Token
        // console.log(token);
        // res.send("Token generated ")
        const hashPassword = await bycrypt.hash(password, 10);
        // console.log(hashPassword);
        const Madeuser = {
            name,
            email,
            password : hashPassword,
        }
        //Hashing Password
        
        client.query(`INSERT INTO users(name, email, password) VALUES('${Madeuser.name}', '${Madeuser.email}', '${Madeuser.password}')`).then((data) => {
            const token = jwt.sign({
                email : email,
            }, process.env.SECRET_KEY);
            res.status(200).json({
                message : "User added succesfully dattabae",
                token : token,
            })
        })
        
        
        // tempData.push(Madeuser);
        // console.log(tempData);
        
    }
    })
    
}


exports.signIn = async (req,res) => {
    const {email, password} = req.body;
    const passwordGet =  await client.query(`SELECT * FROM users WHERE email = '${email}'`);
    if(passwordGet == null) {
        res.status(401).json({
            message : "User does not exists",
        })
    }else{
        const compare = await bycrypt.compare(password, passwordGet.rows[0].password, (err, result) => {
            if(err){
                res.status(500).send("Database error");
            }
            else{
                // console.log(result)
                if(result != true) {
                    res.status(401).json({
                        message : "Enter correct password",
                    })
                }else{
                    const token = jwt.sign({
                        email : email,
                    }, process.env.SECRET_KEY);
                    res.status(200).json({
                        message : "User signed in successfully",
                        token : token,
                    })
                    };
                } 
            }
        )
        
        
    }
}

