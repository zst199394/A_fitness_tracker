const router = require("express").Router();
const Fitness = require("../model/fitness.js");

router.post("/api/workouts", (req, res) => {
  Fitness.create({})
    .then((dbFitness) => {
      res.json(dbFitness);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id);
  Fitness.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((dbFitness) => {
      res.json(dbFitness);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Fitness.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
   .then((dbFitness) => {
      res.json(dbFitness);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Fitness.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbFitness) => {
      res.json(dbFitness);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
