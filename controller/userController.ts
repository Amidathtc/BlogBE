/** @format */

import { Request, Response } from "express";
import  ModelUpdate from "../model/UpdateModel";
import cloudinary from "../config/cloudinary";
import mongoose from "mongoose";

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { Name, Email, Number } = req.body;

    if (!/^\d{11}$/.test(Number)) {
      return res
        .status(400)
        .send("Phone number must contain exactly 11 digits.");
    }

    const user = await ModelUpdate.create({
      Name,
      Email,
      Number,
      Image: Name.charAt(0),
    });

    return res.status(200).json({
      message: "user created",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { Name, Email, Number } = req.body;
    const { userID } = req.params;

    const user = await ModelUpdate.findByIdAndUpdate(
      userID,
      {
        Name,
        Email,
        Number,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "user Updated Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};
export const updateUserImage = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const user = await ModelUpdate.findByIdAndUpdate(
      userID,
      {
        Image: secure_url,
        ImageID: public_id,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "user Successfully Updated his profile",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};
export const RemoveUserImage = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await ModelUpdate.findById(userID);

    user!.Image = user!.Name.charAt(0);

    return res.status(200).json({
      message: "user Successfully Delete his profile",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};
export const userFollow = async (req: any, res: Response) => {
  try {
    const { followerID, followedID } = req.params;
    const sender: any = await ModelUpdate.findById(followerID);
    const receiver: any = await ModelUpdate.findById(followedID);

    if (!sender && !receiver) {
      return res.status(400).json({
        message: "Unauthorized access",
      });
    }

    const send = await sender!.following!.push(
      new mongoose.Types.ObjectId(receiver?._id)
    );
    const receive = await receiver!.followers!.push(
      new mongoose.Types.ObjectId(sender?._id)
    );

    if (send && receive) {
      return res.status(401).json({
        message: "Followed already",
      });
    }

    await sender!.save();
    await receiver!.save();

    return res.status(200).json({
      message: "Successful",
      data: {
        sender,
        receiver,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};
export const userUnFollow = async (req: any, res: Response) => {
  try {
    const { followerID, followedID } = req.params;
    const sender: any = await ModelUpdate.findById(followerID);
    const receiver: any = await ModelUpdate.findById(followedID);

    if (!sender && !receiver) {
      return res.status(400).json({
        message: "Unauthorized access",
      });
    }

    const send = await sender!.following!.pull(
      new mongoose.Types.ObjectId(receiver?._id)
    );
    const receive = await receiver!.followers!.pull(
      new mongoose.Types.ObjectId(sender?._id)
    );

    if (send && receive) {
      return res.status(401).json({
        message: "UnFollowed already",
      });
    }

    await sender!.save();
    await receiver!.save();

    return res.status(200).json({
      message: "Successful",
      data: {
        sender,
        receiver,
      },
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occured",
      data: error,
    });
  }
};
export const SearchAritclec = async (req: Request, res: Response) => {
  try {
    const querydata = req.query;
    const makeSearch = await ModelUpdate.find(querydata);

    return res.status(200).json({
      message: "Gotten",
      data: makeSearch,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
