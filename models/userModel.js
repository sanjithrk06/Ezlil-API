const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
      type: String,
      required: true,
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
      ref: ratings
    }],
    reviews : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: reviews
    }]
  },
  { timestamps: true }
);

function generateCustomerId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

//static signup method
userSchema.statics.signup = async function (
  name,
  email,
  password,
  mobile,
  address = null,
  role,
  status,
 
) {
  console.log("Data", name, email, password, mobile, role, address, status);

  //validation
  if (!email) {
    throw Error("email fields must be filled");
  }
  if (!name) {
    throw Error("name fields must be filled");
  }
  if (!password) {
    throw Error("pass fields must be filled");
  }
  if (!mobile) {
    throw Error("mobile fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  // bcrypting the pass
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    mobile,
    role,
    status,
    address,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("users", userSchema);
