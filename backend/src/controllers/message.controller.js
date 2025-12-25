import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedUser } }).select(
      "-password"
    );

    res.status(200).json(filteredUser);
  } catch (err) {
    console.log("Error in get user for side bar controller : ", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const chattingUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: chattingUserId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: chattingUserId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in get messages by user id controller : ", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  try {
    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in send messages  controller : ", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
