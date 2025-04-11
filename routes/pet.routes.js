const router = require("express").Router();
const PetModel = require("../models/Pet.model");
const uploader = require("../middlewares/cloudinary.middleware")

//post to create a pet
router.post("/create", uploader.single("image"), async (req, res) => {
  console.log("create pet req.body:", req.body)
  PetModel.create(req.body)
    .then((responseFromDB) => {
      console.log("pet created!", responseFromDB);
      res.status(201).json(responseFromDB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Trouble creating your pet" });
    });
});

//route to get all pets
router.get("/all-pets", async (req, res) => {
  PetModel.find()
    // .populate("owner")
    .then((responseFromDB) => {
      console.log("Here are all the pets", responseFromDB);
      res.status(200).json({
        allPets: responseFromDB,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Trouble finding all the pets" });
    });
});

//route to get one pet
router.get("/one-pet/:petId", async (req, res) => {
  try {
    const onePetInDB = await PetModel.findById(req.params.petId);
    res.status(200).json(onePetInDB);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Trouble finding all the pets" });
  }
});

//update the pet title
router.patch("/update-pet/:petId", (req, res) => {
  PetModel.findByIdAndUpdate(req.params.petId, req.body, { new: true })
    //.populate("owner")
    .then((updatedPet) => {
      console.log("pet updated", updatedPet);
      res.status(200).json(updatedPet);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Trouble finding all the pets" });
    });
});

//delete a pet
router.delete("/delete-pet/:petId", async (req, res) => {
  const { petId } = req.params;
  try {
    const deletedPet = await PetModel.findByIdAndDelete(petId);
    console.log("pet deleted", deletedPet);
    res.status(204).json({ message: "pet deleted" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ errorMessage: "Trouble deleting the pet" });
  }
});
module.exports = router;