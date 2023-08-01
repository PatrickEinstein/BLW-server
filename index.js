import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";


//define the server
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE,PATCH",
    allowedHeaders: "Content-Type",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//The routes
app.use("/", router);
app.get("/", (req, res) => {
  res.send("Welcome to BLWGN");
});

//setup mongo connectionI
const PORT = process.env.PORT || 8080;

mongoose
  .connect(
    "mongodb+srv://mongodb:SS6ARbOU4LiwEYAi@cluster0.i9foyr2.mongodb.net/",
     {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    app.listen(PORT, async (req, res) => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console);
