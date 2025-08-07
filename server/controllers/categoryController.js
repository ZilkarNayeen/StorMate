import CategoryModel from "../models/Category.js";

const addCategory = async(req,res)=>{
    try{
        console.log('Received request body:', req.body); // Check what data is being sent

        const{categoryName,categoryDescription}= req.body;

        // Ensure both fields exist before proceeding
        if (!categoryName || !categoryDescription) {
            console.log('Validation Error: Missing category name or description.');
            return res.status(400).json({ success: false, message: 'Category name and description are required.' });
        }

        const existingCategory=await CategoryModel.findOne({categoryName});
        if (existingCategory){
            console.log('Validation Error: Category already exists.');
            return res.status(400).json({success: false, message:'Already exists'});
        }

        const newCategory=new CategoryModel({
            categoryName,
            categoryDescription,
        });

        // Use a separate try/catch for the save operation to catch Mongoose errors
        try {
            await newCategory.save();
            console.log('New category saved successfully!');
            return res.status(201).json({success:true, message:'Added Successfully'});
        } catch (saveError) {
            console.error('Mongoose Save Error:', saveError); // <-- THIS LINE IS KEY
            // The error message from Mongoose is in saveError.message
            return res.status(500).json({ success: false, message: `Failed to save category: ${saveError.message}` });
        }

    } catch (error){
        console.error('General Server Error in addCategory:', error);
        return res.status(500).json({ success: false, message:'Server error'});
    }
};
const getCategories= async(req,res)=>{
    try{
        const categories=await CategoryModel.find();
        return res.status(200).json({success:true, categories});

    }catch(error){
        console.error('Error fetching categories:',error);
         return res.status(500).json({success:false, message:"Server error"});
    }
}

export {addCategory, getCategories};