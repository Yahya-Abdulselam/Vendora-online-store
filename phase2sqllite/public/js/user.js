import { nanoid } from "../node_modules/nanoid/nanoid.js";
export default class User {
  #id;
  #username;
  #password;
  constructor(username, password, id = null) {
    this.#username = username;
    this.#password = password;
    this.#id = id || this.#generateId();
  }
  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
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
