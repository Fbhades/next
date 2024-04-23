import mongoose, { Schema, model, models } from "mongoose";

export interface ICommand extends Document {
  _id:string,
  email: string;
  productIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CommandSchema: Schema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
  },
  productIds: {
    type: [Schema.Types.String],
    required: true,
  },
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
  updatedAt: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

const Command = models.command || model("command", CommandSchema);

export async function connect() {
    await mongoose.connect(
      "mongodb+srv://fbmoddy:Fblux@cluster0.tmxybv9.mongodb.net/ecom?retryWrites=true&w=majority",
      {}
    );
    return models.command
  }

export const addCommand = async (email:string,products:string[]) => {
    const newCommand = {
        email,
        productIds: products,
      };
  return Command.create(newCommand);
};

export const updateCommand = async (commandId: string, updatedCommand: ICommand) => {
  return Command.findByIdAndUpdate(commandId, updatedCommand, { new: true });
};

export const deleteCommand = async (commandId: string) => {
  return Command.findByIdAndDelete(commandId);
};

export const getCommandById = async (commandId: string) => {
  return Command.findById(commandId);
};

export const getAllCommands = async () => {
  return Command.find({});
};