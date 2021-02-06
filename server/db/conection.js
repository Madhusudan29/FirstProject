const mongoose = require("mongoose");
mongoose
  .connect(process.env.Db_cred, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDataBase Sucessfully"))
  .catch((error) => console.log("DataBase Conection Enterupted"));
