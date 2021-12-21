const db = require("../config/db");

class Posts {
  constructor(userId, userLastname, userFirstname, userProfilePic, content) {
    this.userId = userId;
    this.userLastname = userLastname;
    this.userFirstname = userFirstname;
    this.userProfilePic = userProfilePic;
    this.content = content;
  }

  save() {
    let sql = `INSERT INTO posts(
        userId,
        userLastname,
        userFirstname,
        userProfilePic,
        content,
        isLiked
        )
        VALUES(
          '${this.userId}',
          '${this.userLastname}',
          '${this.userFirstname}',
          '${this.userProfilePic}',
          "${this.content}",
          0
      )`;

    return db.execute(sql);
  }
  static getAllPosts() {
    let sql = `SELECT * FROM posts ORDER BY id DESC;`;

    return db.execute(sql);
  }
  static deletePost(id) {
    let sql = `DELETE FROM posts WHERE id = ${id};`;

    return db.execute(sql);
  }
}

module.exports = Posts;
