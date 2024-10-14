import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db";
import { userSchema, UserType } from "../../shared/validations";
import { User } from "./models/user";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.DEV_PORT;

app.post("/signup", async (req, res) => {
  const userData: UserType = req.body;
  const { success, error } = userSchema.safeParse(userData);
  if (!success) {
    res.status(403).json({ message: "Invalid Inputs!", error });
    return;
  }

  try {
    const user = new User(userData);
    await user.save();
    console.log("Inserted User Succesfully!", res);
    res.json({ message: "Inserted User Succesfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went Wrong while saving user!", error });
    return;
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    res.json({ message: "User deleted succesfully!" });
    console.log("User deleted succesfully!");
  } catch (error) {
    res.status(500).json({ message: "error deleting user!" });
    console.error("error deleting user!");
  }
});

const main = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`server listening at port ${PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

main();
