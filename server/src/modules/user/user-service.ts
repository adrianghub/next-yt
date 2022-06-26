import { User, UserModel } from "./user-model";

export async function createUser(user: Omit<User, "comparePassword">) {
  return UserModel.create(user);
}
