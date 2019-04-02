const swag = require('./../models/swag');
module.exports = {
    add: (req, res, next)=>{
        const { id } = req.params;
        let { user } = req.session;
    
        const index = user.cart.findIndex(item => item.id == id);
    
        if (index === -1) {
          const selectedItem = swag.find(item => item.id == id);
    
          user.cart.push(selectedItem);
          user.total += selectedItem.price;
        }
    
        res.status(200).send(user);
    },
    delete: (req, res, next)=>{
        const { id } = req.params;
        const { user } = req.session;
        const indy = user.cart.findIndex(item => item.id == id);
        const item = swag.find(item => item.id == id);
        if(indy !== -1){
            user.cart.splice(indy, 1);
            user.total -= item.price;
        }
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next)=>{
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.status(200).send(req.session.user)
    }
}