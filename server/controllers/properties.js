import properties from "../models/properties.js";

export const AddProperty= async(req, res,next)=>{
    try{
        const {title, desc,img,rating,location,price}=req.body;
        const Property = new properties({
            title,desc,img,rating,location,price
        });
        const createdProperty=await Property.save();
        return res.status(201).json({message: "Property Added Successfully",createdProperty});
    }
    catch (err){
        next(err);
    }
};
export const GetAllProperties=async(req,res,next) =>{
    try{
        const Properties=await properties.find({},{
            title:1,
            desc:1,
            img:1,
            rating:1,
            location:1,
            price:1
        });
        return res.status(200).json(Properties);

    }
    catch(err){
        next(err);
    }
}
export const GetProperty= async(req, res,next)=>{
    try{
        let {search}=req.query;
        const filter={};
        if(search){
            filter.$or = [
                {title:{ $regex: new RegExp(search,"i")}},
                { desc: {$regex: new RegExp(search,"i")}},
                {location: {$regex: new RegExp(search,"i")}}
            ];
        }
        const Properties=await properties.find(filter,{
            title:1,
            desc:1,
            img:1,
            rating:1,
            location:1,
            price:1
        });
        return res.status(200).json(Properties);

    }
    catch (err){
        next(err);
    }
}
export const GetPropertyDetails= async(req, res,next)=>{
    try{
        const {propertyId}=req.params;
        if (!propertyId) {
            return res.status(400).json({ message: "Property ID is required" });
        }
        const Property=await properties.findById(propertyId);
        if (!Property) {
            return res.status(404).json({ message: "Property not found" });
          }
        return res.status(200).json(Property);
    }
    catch (err){
        next(err);
    }
}
