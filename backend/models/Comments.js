const db = require("../config/db");

class Comments {
  constructor(postId, userId, content) {
    this.postId = postId;
    this.userId = userId;
    this.content = content;
  }
  // Méthode pour la création d'un commentaire
  save() {
    let sql = `INSERT INTO comments(
    postId,
    userId,
    content
    )
    VALUES(
      '${this.postId}',
      '${this.userId}',
      "${this.content}"
      )`;

    return db.execute(sql);
  }
  static getAllComments() {
    let sql = `SELECT comments.id, postId, comments.userId, users.userPic, users.lastname, users.firstname, comments.content 
    from comments
    INNER JOIN users ON comments.userId = users.id
    ORDER BY comments.id DESC;`;

    return db.execute(sql);
  }

  static deleteComment(id) {
    let sql = `DELETE FROM comments WHERE id = ${id};`;

    return db.execute(sql);
  }

  static findCommentById(id) {
    let sql = `SELECT * FROM comments WHERE id=${id};`;

    return db.execute(sql);
  }
  static editCommentById(commentId, content) {
    let sql = `UPDATE comments SET content = "${content}" WHERE id=${commentId};`;
    return db.execute(sql);
  }
}

module.exports = Comments;
