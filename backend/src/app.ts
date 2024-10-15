import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db";
import {
  userLoginSchema,
  userSchema,
  userUpdateSchema,
} from "../../shared/validations";
import { User } from "./models/user";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.DEV_PORT;

app.post("/signup", async (req, res) => {
  const userData = req.body;
  const { success, error } = userSchema.safeParse(userData);
  if (!success) {
    res.status(403).json({ message: "Invalid Inputs!", error });
    return;
  }

  try {
    const { password } = userData;
    const hashedPassword = bcrypt.hash(password, 10);
    userData.password = hashedPassword;
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

app.post("/login", async (req, res) => {
  const data = req.body;
  const { error, success } = userLoginSchema.safeParse(data);
  if (!success) {
    res.status(401).json({ message: "Invalid Inputs!", error });
    return;
  }
  
  try {
    //validate password
    const { emailId, password } = data;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).json({ message: "Invalid credentials!", error });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials!", error });
      return;
    }
    res.json({ message: "Logged in succesfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
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

app.patch("/user/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const { success, error } = userUpdateSchema.safeParse(data);
    if (!success) {
      res.status(500).json({ message: "error updated user!", error });
      console.error("error updated user!", error);
      return;
    }
    await User.findByIdAndUpdate({ _id: id }, data, { runValidators: true });
    res.json({ message: "User updated succesfully!" });
    console.log("User updated succesfully!");
  } catch (error) {
    res.status(500).json({ message: "error updated user!", error });
    console.error("error updated user!");
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
