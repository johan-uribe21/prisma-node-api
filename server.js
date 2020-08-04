import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";

// auth
import passport from "./config/authConfig";

// utils
import * as authUtils from "./controllers/auth/authUtilities";

// routers
import gigRouter from "./controllers/gig/gig.routes";
import userRouter from "./controllers/user/user.routes";
import postRouter from "./controllers/post/post.routes";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(authUtils.jwtAuthMiddleware);

// Initialize Passport
app.use(passport.initialize());

// main routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  authUtils.jwtSuccessfulLogin
);

app.use("/gigs", authUtils.verifyAuthenticated, gigRouter);
app.use("/user", authUtils.verifyAuthenticated, userRouter);
app.use("/post", authUtils.verifyAuthenticated, postRouter);

// fallback
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
