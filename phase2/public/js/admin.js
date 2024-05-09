import User from "./user.js";

class Admin extends User {
  constructor(username, password, userId) {
    super(username, password, userId);
  }
}
