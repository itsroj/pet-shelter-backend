const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const uploader = require("../middlewares/cloudinary.middleware");

// Route to create a user with a hashed password
router.post("/signup", uploader.single("profileImage"), async (req, res) => {
  try {
    console.log(req.body);
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);
    const hashedUser = {
      ...req.body,
      password: hashedPassword,
      profileImage: req.file.path,
    };

    const newUser = await UserModel.create(hashedUser);
    console.log("User created successfully", newUser);
    res.status(201).json({ message: "User successfully created in DB" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//now a login route to find the user by their email and check if they know the password
router.post("/login", async (req, res) => {
  try {
    //we need to find the user based on their email
    const foundUser = await UserModel.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Email not found" });
    } else {
      //if you found the user based on the email then we compare the passwords
      const passwordFromFrontend = req.body.password; // '1234'
      const passwordHashedInDB = foundUser.password; //'ajdslfkjalkdfsjalsdfuoiajdfdsaf'
      const passwordsMatch = bcryptjs.compareSync(
        passwordFromFrontend,
        passwordHashedInDB
      );
      //   console.log("passwords match ? ", passwordsMatch);
      if (!passwordsMatch) {
        res.status(400).json({ errorMessage: "Password incorrect" });
      } else {
        //in this else block, the email exists and the password match
        //this the non secret data that we want to put into the jwt token
        const data = {
          _id: foundUser._id,
          username: foundUser.username,
          role: foundUser.role,
        };
        const authToken = jwt.sign(data, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ message: "you logged in!", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//this route checks if the token is present and valid
router.get("/verify", isAuthenticated, async (req, res) => {
  try {
    // console.log("here in the verify route");
    
    // Get user ID from the token payload
    const userId = req.payload._id;
    
    // Fetch the complete user data from database (except password)
    const currentUser = await UserModel.findById(userId).select("-password");
    
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Return token validity confirmation and user data including profile image
    res.status(200).json({ 
      message: "Token valid", 
      payload: {
        ...req.payload,
        profileImage: currentUser.profileImage
      }
    });
  } catch (error) {
    // console.log("Error in verify route:", error);
    res.status(500).json({ message: "Server error in verify route" });
  }
});

module.exports = router;
