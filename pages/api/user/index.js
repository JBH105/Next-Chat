import dbConnect from "../utils/dbConnect";
import Userdata from "../models/auth";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    try {
      const user =await Userdata.find();
      res.status(200).json( user );
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
};
