const { model, Schema } = require("mongoose");
const joi = require("joi");
// const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    // confirmPassword: joi
    //   .any()
    //   .valid(joi.ref("password"))
    //   .required()
    //   .options({
    //     language: { any: { allowOnly: "Password does not match." } },
    //   }),

    // isAdmin: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    role: {
      type: String,
      default: "User",
      enum: ["User", "admin", "staff"],
    },

    accessToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = model("User", userSchema);
