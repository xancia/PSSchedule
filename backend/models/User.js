const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: {
        type: String,
        enum: ["pdCoach", "techInstructor", "learnerSupport", "financialCoach"],
        required: true,
      },
      forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }], // Optional: to track forms associated with this user
    },
    { timestamps: true }
  );

const User = mongoose.model("User", userSchema);

module.exports = User;
