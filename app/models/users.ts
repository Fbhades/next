import mongoose, { Schema, model, models } from "mongoose";

export interface User {
  _id: string;
  name: string;
  email: string;
}

const userSchema = new Schema({
  name:  { type: String, required: true },
  email:  { type: String, required: true },
});

const User = models.product || model("User", userSchema);


async function connect() {
  await mongoose.connect(
    "mongodb+srv://fbmoddy:Fblux@cluster0.tmxybv9.mongodb.net/ecom?retryWrites=true&w=majority",
    {}
  );
}

function deleteUserById(_id: string) {
  return User.findByIdAndDelete(_id);
}

function updateUserById(_id: string, user: User) {
  return User.findByIdAndUpdate(_id, user, { new: true });
}

async function selectAllUsers() {
  let result = await User.find();
  return result;
}

async function selectUserByEmail(email: any){
    const result = await User.findOne({ email });
    console.log('Query Result: ', result);
    return result;
}

export {
  connect,
  User,
  deleteUserById,
  updateUserById,
  selectAllUsers,
  selectUserByEmail,
};
