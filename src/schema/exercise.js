const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
  {
    user_id: String,
    teacher_id: String,
    name: String,
    desciption: String,
    num_of_times: String,
    repetitions: String,
    interval: String,
    weight: String,
    days_of_week: String,
    icon: String,
  },
  { collection: "exercise" }
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
