import { nanoid } from "nanoid";

export default class User {
  #id;
  #username;
  #password;
  constructor(username, password) {
    this.#username = username;
    this.#password = password;
    this.#id = User.#generateId();
  }
  get id() {
    return this.#id;
  }

  get password() {
    return this.#password;
  }

  get username() {
    return this.#username;
  }

  toJSON() {
    return {
      id: this.#id,
      username: this.#username,
      password: this.#password,
    };
  }

  static #generateId() {
    return nanoid(10);
  }
}

const user1 = new User("hello123","hello123");
console.log(user1);
