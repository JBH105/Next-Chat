const mongoose = require("mongoose");

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose
    .connect(
      "mongodb+srv://jaydeep:COwt7ZlgDQr5qh57@cluster0.p7sbc.mongodb.net/Next-Chat?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

export default dbConnect;
