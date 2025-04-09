const { Schema, model } = require("mongoose");
const petSchema = new Schema({
    type: {
        type: String,
        enum: ["cat", "dog"],
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    }, 

    image: {
        type: String,
        required: true,
    }, 
});
const PetModel = model("pet", petSchema);
module.exports = PetModel;

    