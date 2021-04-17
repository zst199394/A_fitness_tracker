const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  exercises: [
    {
      name: {
        type: String,
        trim: true,
        required: "Enter excercise name",
      },
      type: {
        type: String,
        trim: true,
        required: "Enter excercise type",
      },
      duration: {
        type: Number,
        required: "Enter an amount",
      },
      distance: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
    },
  ],

  day: {
    type: Date,
    default: ()=>new Date,
  },
});

const Fitness = mongoose.model("Fitness", fitnessSchema);

module.exports = Fitness;
