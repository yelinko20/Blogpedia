import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import createHttpError, { isHttpError } from "http-errors";
import userRoutes from "./routes/user/user-route";
import postRoutes from "./routes/posts/post-route";
import savedPostRoutes from "./routes/posts/saved-post-route";
import recoveryRoutes from "./routes/user/recover-route";
import profileRoutes from "./routes/profile/profile-route";
import editorImageUploadRoute from "./routes/editor-image-route";
import { env } from "./utils/validateEnv";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
    methods: "GET,PUT,POST,PATCH,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// app.use(
//   session({
//     name: "access_token",
//     secret: env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//       httpOnly: true,
//     },
//   })
// );

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/recovery", recoveryRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", savedPostRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/editor", editorImageUploadRoute);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const serverMessage = "Welcome to the server!";
  console.log(serverMessage);

  // Send a response to the client
  res.send({ message: serverMessage });
});

// Error handling middleware for 404 Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// Global error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An error occurred!";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
