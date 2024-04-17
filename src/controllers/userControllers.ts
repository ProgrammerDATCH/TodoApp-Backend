import { Request, Response } from "express";
import User from "../models/User";
import { comparePassword, encryptPassword, generateToken } from '../utils'

const registerUser = async (req: Request, res: Response)=>{
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user) return res.json({status: false, message: "User already exist."});
    const hashedPassword = await encryptPassword(password);
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword
    });
    await newUser.save();
    res.json({status: true, message: newUser.name + " registered."});
}

const getAllUsers = async (req: Request, res: Response)=>{
    const users = await User.find();
    res.json({status: true, message: users});
}

const checkUser = async(req: Request, res: Response)=>{
    const user = await User.findOne({_id:  (req as any).userId})
    if(!user) return res.json({status: false, message: "User not found!"});
    res.json({status: true, message: user});
}

const loginUser = async (req: Request, res: Response)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.json({status: false, message: "Invalid credentials"});
    const passwordMatches = await comparePassword(password, user.password);
    if(!passwordMatches) return res.json({status: false, message: "Invalid credentials"});
    const token = generateToken(user.id);
    res.json({status: true, message: {token}});
}

const deleteUser = async (req: Request, res: Response)=>{
    const {email} = req.body;
    const user = await User.findOne({email: email});
    if(!user) return res.json({status: false, message: "User doesn't exist."});
    const { deletedCount } = await User.deleteOne({email});
    if(deletedCount < 1) res.json({status: false, message: "Failed to delete User"});
    else res.json({status: true, message: "Deleted."});
}

const updateUser = async (req: Request, res: Response)=>{
    const {name, email} = req.body;
    const user = await User.findOne({email: email});
    if(!user) return res.json({status: false, message: "User doesn't exist."});
    const updatedUser = await User.updateOne({email}, {name});
    if(updatedUser.modifiedCount > 0) res.json({status: true, message: "User updated successfully"});
    else res.json({status: false, message: "Failed to update User"});
}

export {
    registerUser,
    getAllUsers,
    loginUser,
    deleteUser,
    updateUser,
    checkUser,
}