const Category = require("../models/category");
exports.getCategoryByID = (req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err)
        return res.status(400).json({
            error:"Category not found"
        })
        req.category = cate;
        next()
    })
   

}

exports.createCategory = (req,res)=>{
    const category = new Category(req.body)

    category.save((err,category)=>{
        if(err)
        return res.status(400).json({
            error:"Not Able to save in the DB "
        })
        res.json({category})

    })
}

exports.getCategory = (req,res)=>{
    res.json(req.category)
}

exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,items)=>{
        if(err)
        return res.status(400).json({
            error:"No categories found "
        })
        res.json(items)
    })

}

exports.updateCategory = (req,res)=>{
    const category = req.category;
    category.name = req.body.name
    category.save((err,updatedcategory)=>{
        if(err)
        {
            res.return.status(400).json({
                error:"Failed to update category"
            })
        }
        res.json(updatedcategory)
    })
}
exports.removeCategory = (req,res)=>{
    const category  = req.category

    category.remove((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Category cannot be removed"
            })
        }
        res.json({
            message:`Category ${req.category.name} Successfully deleted`
        })
    })
}