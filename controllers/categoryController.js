import Category from "../models/categoryModel.js"

class CategoryController{

    categoryData = [
        {
            categoryName: "Biryani"
        },
        {
            categoryName: "Kebabs"
        },
        {
            categoryName: "Naan"
        },
        {
            categoryName: "Curries"
        },
        {
            categoryName: "Haadi Masu"
        },

    ]

   async seedCategory(){
        const categoryExists = await Category.findAll();
        if(categoryExists.length === 0 ){
            const Categories = await Category.bulkCreate(this.categoryData);
            console.log("Categories seeded successfully")
        }else{
            console.log("Categories already seeded")
        }
        
   }

   async createCategory(req, res){
    const {categoryName} = req.body;

    if(!categoryName){
        res.status(400).json({
            success: false,
            message: "provide a category name"
        });
        return;
    }

    const newCategory = await Category.create({
        categoryName
    });

    res.status(200).json({
        success: true,
        message: "category added successfully",
        data: newCategory
    })
   }

   async getAllCategories(req, res){
    const allCategories = await Category.findAll();
    if(!allCategories){
        res.status(404).json({
            success: false,
            message: "you have not created ay categories yet"
        });
        return
    }
    res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        data: allCategories
    });
    return;
   }

   async getSingleCategory(req, res){
    const {id} = req.params

    const singleCategory = await Category.findOne({where: {categoryId: id}})

    if(!singleCategory){
        res.status(400).json({
            success: false,
            message: "no any category with that id found"
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "single category fetched successfully",
        data: singleCategory
    });
    return;
   }
   
   async updateCategory(req, res){
    const {id} = req.params;
    const {categoryName} = req.body
    const updatecategory = await Category.findOne({where: {
        categoryId: id
    }})

    if(!updatecategory){
        res.status(404).json({
            success: false,
            message: "no category with that id"
        });
        return;
    }
    if(categoryName) updatecategory.categoryName = categoryName;

    await updatecategory.save();

    res.status(200).json({
        success: true,
        message: "category updated successfully",
        data: updatecategory
    })
   }

   async deleteCategory(req, res){
    const {id} = req.params
    const category = await Category.findOne({where: {
        categoryId: id
    }})

    if(!category){
        res.status(404).json({
            success: false,
            message: "no category with that id"
        });
        return;
    }
    await Category.destroy({where: {
        categoryId: id
    }});

    res.status(200).json({
        success: true,
        message: "category deleted successfully",
        
    })
}

}

export default new CategoryController();