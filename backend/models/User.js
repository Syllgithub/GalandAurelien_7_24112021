const db = require("../config/db");

class User {
  constructor(lastname, firstname, email, password, isAdmin) {
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  // Méthode pour enregistrer un utilisateur dans la base de données
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
        '${this.isAdmin}'
    )`;

    return db.execute(sql);
  }

  static findByEmail(email) {
    let sql = `SELECT * FROM users WHERE email = "${email}";`;

    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT lastname,firstname,email,bio,userPic, isAdmin FROM users WHERE id = ${id};`;

    return db.execute(sql);
  }

  static updateUser(user) {
    let sql = `UPDATE users SET lastname="${user.lastname}", firstname="${user.firstname}", email="${user.email}", bio="${user.bio}", userPic="${user.userPic}" WHERE id = ${user.id}`;

    return db.execute(sql);
  }

  static deleteUser(id) {
    let sql = `DELETE FROM users WHERE id=${id};`;

    return db.execute(sql);
  }
}

module.exports = User;
