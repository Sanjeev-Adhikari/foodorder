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
}

export default new CategoryController();