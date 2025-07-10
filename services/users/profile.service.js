import User from "../../models/user.model.js";


export async function profileService(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }

  return user;
}