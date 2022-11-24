import dbConnect from "../utils/dbConnect";
import Userdata from "../models/auth";
import wall from "../models/offerwall";
import offer from "../models/offer";
import cloudinary from "../utils/coludinary";
import crypto from "crypto"


dbConnect();

export default async (req, res) => {
  const { method } = req;

  if (method === "POST" && req.body.apitype == "userinfodetail") {
    try {
      const { id } = req.query
      var data = req.body;
      if (data?.userImage) {
        await cloudinary.uploader.upload(data.userImage, async (err, result) => {
          const updateData = await Userdata.findByIdAndUpdate({ _id: id }, { userImage: result?.url });
          res.status(200).json("Image Update Sucessfully");
        });
      } else {
        await Userdata.findByIdAndUpdate({ _id: id }, data);
        res.status(200).json("Update Sucessfully");
      }
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  if (method === "GET") {
    try {
      const { id } = req.query
      const userData = await Userdata.findOne({ _id: id }).lean();
      const wallsData = await wall.find({ user_id: id }).lean();
      const offerData = await offer.find({ user_id: id }).lean();
      return res.send({
        ...userData,
        walls: wallsData.length,
        offer: offerData.length,
      })
    } catch (error) {
      console.log("error", error)
      res.status(400).json({ success: false });
    }
  }

  if (method === "DELETE") {
    try {
      const { id } = req.query;
      const data = await Userdata.findByIdAndDelete({ _id: id });
      if (!data) {
        return res.status(400).json({ success: false });
      }
      res.status = res.json("data has benn deleted");
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }


  if (method === "POST" && req.body.apitype == "discarddetail") {

    try {
      var { id } = req.query;
      const data = req.body;
      console.log(id)
      await Userdata.findByIdAndUpdate({ _id: id }, data);
      return res.send({ message: "Delete discard detail Sucessfully" });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  if (method === "POST" && req.body.apitype == "resetPassword") {

    try {
      const data = req.body;

      const resetPasswordToken = crypto.createHash("sha256").update(data?.token).digest("hex");

      const user = await Userdata.findOne({
        resetPasswordToken
      })
      if (!user) {
        return res.status(403).json({ message: "Reset Password Token is not valid" });
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.send(user);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }



};
