const mongoose = require ('mongoose')
const {Schema} = mongoose;

//create a schema object for menu items
const menuSchema= new Schema({
    name: {
        type: 'string',
        trim:true,
        required: true,
        minlength: 3,
    },
    recipe: String,
    image:String,
    category:String,
    price: Number
})

// create model 
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;