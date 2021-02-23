import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: './config.env' });
import app from "./index";





const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(()=> console.log(" Db connection done successfully"));


  const port = process.env.PORT||3000;
  app.listen(port, () =>
  process.stdout.write(`Listening on port ${port} ...\n`)
  //console.log(`Listening on port ${port} ...`)
); 