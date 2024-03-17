import { nanoid } from "nanoid";
class User {
  #id;
  #username;
  #password;
  constructor(username, password) {
    this.#username = username;
    this.#password = password;
    this.#id = generateid();
  }
  get id() {
    return this.#id;
  }

  get password() {
    return this.#password;
  }

  get usename() {
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
