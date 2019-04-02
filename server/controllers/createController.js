const swag = require('./../models/swag');
module.exports = {
    search: (req, res, next)=>{
        const { category } = req.query;
        if (category){
            let filteredSwag = swag.filter((item, i)=>{
                return item.category == category
            })
            res.status(200).send(filteredSwag)
        } else if (!category) {
            res.status(200).send(swag)
        }
    } 
}