const users = require('./../models/users');
let id = 1;
module.exports = {
    login: (req, res, next)=>{
        let { username, password } = req.body;
        const user = users.find((val, i)=>{
            return (val.username === username && val.password === password)
        })
        if (user){
            req.session.username = username;
            res.status(200).send(req.session.user);
        } else if (!user){
            res.status(500).send('who dis?')
        }
    },
    register: (req, res) => {
        const { username, password } = req.body;
    
        users.push({ id, username, password });
        id++;
    
        req.session.user.username = username;
    
        res.status(200).send(req.session.user);
      },
    
    signout: (req, res, next)=>{
        req.session.destroy();
        res.status(200).send(req.session)
    },
    getUser: (req, res, next)=>{
        res.status(200).send(req.session.user)
    }
}



