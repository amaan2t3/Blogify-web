const {   model , Schema } = require("mongoose");

const {createHmac , randomBytes} = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profile:{
      type: String,
       default: "../public/image/default.jpg"
    },
    roll:{

      type: String,
      enum: ["USER", "ADMIN" ] ,
      default: "USER",
    }
  },
  { timestamps: true },
);

userSchema.pre("save" , function(next){
        const user = this;
        if(!user.isModified("password")) return;

        const salt = randomBytes(16).toString();
        const hashPassword =  createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
  
        this.salt = salt;
        this.password = hashPassword;
 })



const User = model("User", userSchema);

module.exports = User;
