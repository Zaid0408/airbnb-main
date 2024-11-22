import express from "express";
import {
    AddToFavourites,
    SignIn,SignUp,
    BookProperty,GetBookedProperty,
    GetUserFavourites,RemoveFromFavourites
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router=express.Router();

router.post("/signin",SignIn);
router.post("/signup",SignUp);
router.post("/addToFavourites",[verifyToken],AddToFavourites);
router.post("/removeFromFavourites",[verifyToken],RemoveFromFavourites);
router.get("/getUserFavourites",[verifyToken],GetUserFavourites);
router.post("/bookProperty",[verifyToken],BookProperty);

export default router;