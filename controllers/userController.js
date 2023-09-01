import user from "../models/user.js";

export const updateUser = async (req, res, next) => {
  try {
    const updateuser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateuser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted sucessfully.");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const User = await user.findById(req.params.id);
    res.status(200).json(User);
  } catch (error) {
    next(error);
  }
};

export const getallUsers = async (req, res, next) => {
  try {
    const Users = await user.find({});
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};
