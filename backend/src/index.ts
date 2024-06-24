import express from "express";
import productRouter from "./routes/productRouter";
import categoryRouter from "./routes/categoryRouter";
// import bodyParser from 'body-parser'

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
