const db = require("../config/db");

class Posts {
  constructor(userId, content) {
    this.userId = userId;
    this.content = content;
  }

  // Méthode pour la création d'un post
  save() {
    const date = new Date();
    // Création d'un tableau pour convertir le numéro du mois en texte pour la date du post
    const monthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "aout",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    let sql = `INSERT INTO posts(
        userId,
        content,
        isLiked,
        postDate
        )
        VALUES(
          '${this.userId}',
          "${this.content}",
          0,
          "Le ${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}"
      )`;

    return db.execute(sql);
  }

  static editPostById(postId, content) {
    let sql = `UPDATE posts SET content = "${content}" WHERE id=${postId};`;
    return db.execute(sql);
  }
  static deletePost(id) {
    let sql = `DELETE FROM posts WHERE id = ${id};`;

    return db.execute(sql);
  }
  static deletePostsByUserId(id) {
    let sql = `DELETE FROM posts WHERE userId = ${id};`;

    return db.execute(sql);
  }
  static getPostsByUserId(userId) {
    let sql = `SELECT posts.id, content, userPic, lastname, firstname, postDate, users.id AS user_id
    from posts 
    INNER JOIN users ON posts.userId = users.id 
    WHERE ${userId} = posts.userId 
    ORDER BY posts.id DESC;`;

    return db.execute(sql);
  }
  // Requete qui comprends les posts et les commentaires, avec un LEFT JOIN
  static getAllPosts() {
    let sql = `SELECT  users.userPic AS commentUserPic, users.lastname AS commentLastname, users.firstname AS commentFirstname, posts.id AS postID, posts.userID AS postUserID, posts.content AS postContent, postDate, comments.id AS commentId, comments.postId AS commentPostID, comments.userId AS commentUserID, comments.content AS commentContent
    FROM posts
    LEFT JOIN comments
    ON comments.postId = posts.id
		LEFT JOIN users 
    ON comments.userId = users.id
    
    ORDER BY posts.id DESC, comments.id DESC;`;

    return db.execute(sql);
  }

  static getUsernameByPostId(postId) {
    let sql = `SELECT lastname, firstname, userPic
      FROM users 
      INNER JOIN posts
      ON posts.userId = users.id
      WHERE posts.userId = ${postId};`;

    return db.execute(sql);
  }

  static findPostById(id) {
    let sql = `SELECT * FROM posts WHERE id=${id};`;

    return db.execute(sql);
  }
}

module.exports = Posts;
