const users: Record<string, string> = {
  admin: "123",
};

class UserModel {
  static find(username: string) {
    return users[username] ? { username, password: users[username] } : null;
  }
}

export default UserModel;
