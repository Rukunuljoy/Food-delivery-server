const Menu = require("../models/Menu")

const getAllMenuItem = async(req,res)=>{
    try {
        const menus = await Menu.find({}).sort({createdAt: -1});
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// post a menu item 

const postMenuItem = async (req, res) => {
    const newItem = req.body
     try {
        const result = await Menu.create(newItem);
        res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:error.message})

     }
}
const singleItem = async (req, res) => {
    const menuId = req.params.id;
  
    try {
      const menu = await Menu.findById(menuId);
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const deleteMenuItem = async (req, res) => {
    const menuId = req.params.id;

    try {
        const deletedItem = await Menu.findByIdAndDelete(menuId);

        if (!deletedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        return res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// update single item 
const updateSingleItem = async (req,res) =>{
    const menuId = req.params.id;
    const { name, recipe, image, category, price} = req.body;
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(menuId, {name, recipe, image, category, price}, {new:true, runValidator: true})
        if(!updatedMenu) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        return res.status(200).json(updatedMenu);
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }

}

module.exports = {
    getAllMenuItem,
    postMenuItem,
    deleteMenuItem,
    singleItem,
    updateSingleItem
}