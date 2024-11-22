import express from "express";
import {AddProperty,GetProperty,GetPropertyDetails,GetAllProperties} from "../controllers/properties.js";

const router=express.Router();

router.post("/addProperty", AddProperty);
router.get("/getPropertyDetails/:propertyId", GetPropertyDetails);
router.get("/getProperty", GetProperty);
router.get("/getAllProperties", GetAllProperties);

export default router;