

import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./router/userRouter";
import passport from "passport";
import "./config/auth";
import session from "express-session";
import user from "./router/userRouter"
import friend from "./router/FriendRouter"
import request from "./router/RequestRouter"
import rating from "./router/RatingRouter"
import articles from "./router/articleRouter"
import category from "./router/categoryRouter"
import admin from "./router/adminRouter"
import ads from "./router/adRouter"
import  comment from "./router/commentRouter"
import follow from "./router/userRouter"
import like from "./router/likeRouter"

export const mainApp = (app: Application) => {
  app.use(express.json()).use(cors());
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/", (req: Request, res: Response) => {
    res.send("Active Server🚀🚀🚀");
  });
  app.get("/check", (req: Request, res: Response) => {
    res.send(`<a href= "/veri/google">Authenicate with google</a>`);
  });

  app.get(
    "/veri/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", {
      successRedirect: "/google/callback/protect",
      failureRedirect: "/google/callback/failure",
    })
  );

  app.get("/google/callback/protect", (req: any, res: any) => {
    return res.send(`hello ${req?.user?.displayName}`);
  });
  app.get("/google/callback/failure", (req, res) => {
    return res.send("failed to authnticate");
  });
  app.use("/api/v1", user);
  app.use("/api/v1", friend);
  app.use("/api/v1", request);
  app.use("/api/v1", rating);
  app.use("/api/v1", articles);
  app.use("/api/v1", category);
  app.use("/api/v1", admin);
  app.use("/api/v1", ads);
  app.use("/api/v1", comment);
  app.use("/api/v1", follow);
  app.use("/api/v1", like);
  app.use("/api/v1", router);
};
