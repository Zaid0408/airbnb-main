import User from "../models/user.js";
import properties from "../models/properties.js";
import { createError } from "../error.js";
import dotenv from"dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
// below are the functionalities that the user will perform
export const SignUp= async(req, res,next)=>{
    try{
        const {email,password,name}=req.body; // extract user details

        const existingUser= await User.findOne({email}).exec();
        if(existingUser){ // if user present in db return error
            return next(createError(409,"User already exists"));
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);// hashing to encrypt password 
        const newUser=new User({
            name,email,password:hashedPassword,
        });// create new user with name,email,password
        const savedUser=await newUser.save(); // save user in db

        const tokenJwt=jwt.sign({id:savedUser._id},process.env.JWT,{
            expiresIn:"99 years",
        });// create jwt token for user


        return res.status(201).json({tokenJwt,user:savedUser});
    }
    catch(err){
        next(err);
    }
};
export const SignIn= async(req, res,next)=>{
    try{
        const {email,password}=req.body;
        const existingUser= await User.findOne({email}).exec(); // check if user present in db
        if(!existingUser){ // if user present in db return error
            return next(createError(409,"User does not exists"));
        }
        const isPasswordCorrect= await bcrypt.compareSync(password,existingUser.password);
        if(!isPasswordCorrect){
            return next(createError(403,"Invalid Password"));
        }
        const tokenJwt=jwt.sign({id:existingUser._id},process.env.JWT,{
            expiresIn:"99 years",
        });// create jwt token for user

        return res.status(200).json({tokenJwt,user:existingUser});
    }
    catch(err){
        next(err);
    }
};
export const BookProperty= async(req, res,next)=>{
    try{
        const userId=req.user.id;
        const {propertyId}=req.body;
        //check if both property and user exist
        const property= await properties.findById(propertyId);
        if(!property){
            return next(createError(404,"Property Not Found"));
        }

        const user=await User.findById(userId);
        if(!user){
            return next(createError(404,"User Not Found"));
        }
        // add property to the purchased array if not already present 
        if(!user.bookings.includes(propertyId)){
            user.bookings.push(propertyId);
            await user.save();
        }
        return res.status(200).json({message:"Property Booked Successfully"});
    }
    catch(err){
        next(err);
    }
};
export const GetBookedProperty= async(req, res,next)=>{
    try{
        const userJWT=req.user;
        const user=await User.findById(userJWT.id).populate({
            path:"bookings",
            model:"Property",
        });
        const bookedProperty=user.purchased;
        return res.status(200).json({bookedProperty});
    }
    catch(err){
        next(err);
    }
};
export const AddToFavourites = async(req, res,next)=>{
    try{
        const {propertyId}=req.body;
        const userJWT=req.user;
        const user=await User.findById(userJWT.id);
        // if property not present in favourites add it
        if(!user.favouriteProperties.includes(propertyId)){
            user.favouriteProperties.push(propertyId);
            await user.save();
        }
        
        return res.status(200).json({message:"Property added to favourites Successfully"});
    }
    catch(err){
        next(err);
    }
};
export const RemoveFromFavourites = async(req, res,next)=>{
    try{
        const {propertyId}=req.body;
        const userJWT=req.user;
        const user=await User.findById(userJWT.id);
        // filter out favourite properties such that fav is everything in properties except the one to be removed
        user.favouriteProperties=user.favouriteProperties.filter(
            (fav) => fav.toString() !== propertyId
        );
        await user.save();

        return res.status(200).json({message:"Property removed to favourites Successfully"});
    }
    catch(err){
        next(err);
    }
};
export const GetUserFavourites= async(req,res,next)=>{
    try{
        const userId=req.user.id;
        const GetUser = await User.findById(userId).populate("favouriteProperties").exec();
        if(!GetUser){
            return next(createError(404,"User Not Found"));
        }
        return res.status(200).json(GetUser?.favouriteProperties);

    }
    catch(err){
        next(err);
    }
};