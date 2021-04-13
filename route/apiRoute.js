const router = require("express").Router();
const Fitness = require("../models/fitness.js");

router.post("/api/workouts", ({ body }, res) => {
  Fitness.create(body)
    .then((dbFitness) => {
      res.json(dbFitness);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


router.put("/api/workouts/:id", (req, res) => {
  Fitness.findByIdAndUpdate(
    req.paramas.id,
    { $push: { excercises: req.body } },
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
  Fitness.find({})
    .sort({ date: -1 })
    .then((dbFitness) => {
      res.json(dbFitness);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Fitness.find([
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
