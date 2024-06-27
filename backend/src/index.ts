import express from "express";
import productRouter from "./routes/productRouter";
import categoryRouter from "./routes/categoryRouter";
import cors from "cors";
import session from "express-session";
import passport from "./config/passportConfig";
import authRoutes from "./routes/authRoutes";
// import bodyParser from 'body-parser'

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(
  session({
    secret: process.env.PASSPORT_SECRET!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
