import "dotenv/config";
import Intern from "../models/intern.js";
import { genreteToken } from "../utils/JWT.js";

export const login = async (req, res) => {
  try {
    const { uniqueId, joiningDate } = req.body;

    if (!uniqueId || !joiningDate)
      return res.status(400).json({ message: "Enter your credentials" });
    //  Find user
    const user = await Intern.findOne({ uniqueId });

    if (!user) return res.status(404).json({ massage: "invalid credintionls" });

    const dbDate = new Date(user.joiningDate).toISOString().split("T")[0];

    if (dbDate !== joiningDate)
      return res.status(404).json({ massage: "invalid credintionls" });

    //  Generate token
    genreteToken(user._id, res);
    res.status(201).json({
      id: user.uniqueId,
      userName: user.name,
      email: user.email,
      domain: user.domain,
      status: user.status,
      badgesEarned: user.badgesEarned,
    });

    // Send response
  } catch (error) {
    console.error("error in controller", error);
    res.status(501).json({
      massage: "internal sever error",
    });
  }
};
export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ massage: "you are logout" });
};
