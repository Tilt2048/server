const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
