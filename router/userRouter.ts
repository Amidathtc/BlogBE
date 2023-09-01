/** @format */

import { Router } from "express";
import {
  CreateUser,
  RemoveUserImage,
  SearchAritclec,
  updateUser,
  updateUserImage,
  userFollow,
  userUnFollow,
} from "../controller/userController";
import ViewImage from "../utils/multer";

const router = Router();

router.route("/createUser").post(CreateUser);
router.route("/:userID/updateUser").patch(updateUser);
router.route("/:userID/updateuserImage").patch(ViewImage, updateUserImage);
router.route("/:userID/RemoveuserImage").patch(RemoveUserImage);
router.route("/:followerID/:followedID/follow").patch(userFollow);
router.route("/:followerID/:followedID/Unfollow").patch(userUnFollow);
router.route("/search").get(SearchAritclec);

export default router;
