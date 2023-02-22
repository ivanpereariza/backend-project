const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: value => ['@gmail.com', '@hotmail.com', '@outloock.com'].some(mail => value.endsWith(mail)),
        message: 'Only valids emails'
      }
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1676731282/backend-project/avatar-default_wrvn6i.jpg',
    },
    description: {
      type: String,
      default: "Dont have description"
    },
    role: {
      type: String,
      enum: ['USER', 'EDITOR', 'ADMIN'],
      default: 'USER'
    },
    dimension: {
      type: String,
      enum: ['Dimension C-137', 'Post-Apocalyptic Dimension', 'Replacement Dimension', 'Cronenberg Dimension', 'Testicle Monster Dimension'],
    },
    favorites: [{
      characters: {
        type: [String],
      },
      locations: {
        type: [String],
      },
      episodies: {
        type: [String],
      },
    }],
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
