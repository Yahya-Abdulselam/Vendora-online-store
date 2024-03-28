import { nanoid } from "../node_modules/nanoid/nanoid.js";
export default class User {
  #id;
  #username;
  #password;
  constructor(username, password) {
    this.#username = username;
    this.#password = password;
    this.#id = this.#generateId();
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
  #generateId() {
    return nanoid();
  }

  toJSON() {
    return {
      id: this.#id,
      username: this.#username,
      password: this.#password,
    };
  }
}
