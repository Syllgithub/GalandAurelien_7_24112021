const db = require("../config/db");

class User {
  constructor(lastname, firstname, email, password) {
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
  }

  save() {
    let sql = `INSERT INTO users(
      lastname,
      firstname,
      email,
      password,
      isAdmin
      )
      VALUES(
        '${this.lastname}',
        '${this.firstname}',
        '${this.email}',
        '${this.password}',
        0
    )`;

    return db.execute(sql);
  }
  // Voir index BDD pour email
  static findByEmail(email) {
    let sql = `SELECT * FROM users WHERE email = "${email}";`;

    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT lastname,firstname,email,bio,userPic FROM users WHERE id = ${id};`;

    return db.execute(sql);
  }

  static updateUser(user) {
    let sql = `UPDATE users SET lastname="${user.lastname}", firstname="${user.firstname}", email="${user.email}", bio="${user.bio}", userPic="${user.userPic}" WHERE id = ${user.id}`;

    return db.execute(sql);
  }
}

module.exports = User;
