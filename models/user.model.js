const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return generateCustomerId();
      },
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "User"],
      default: "User",
    },
    address: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses"
    }],
    ratings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings"
    }],
    reviews : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews"
    }]
  },
  { timestamps: true }
);

function generateCustomerId() {
  const chars =
    "0123456789";
  let result = "EZL";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = mongoose.model("users", userSchema);
