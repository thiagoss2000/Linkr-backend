import connection from "../data/db.js";
import urlMetadata from "url-metadata";

export function sendPostsTimeline() {
  return connection.query(
    "SELECT post.text_post, post.link, post.likes FROM post ORDER BY DESC"
  );
}

export function authUserTimeline(token) {
  return connection.query("SELECT token FROM sessions WHERE token = $1", [
    token,
  ]);
}

export function postTimeline(postBody)
{
  const {link,text_post} = postBody

  const linkMetadata = await urlMetadata(`${link}`)

  connection.query('INSERT INTO post (link,text_post) VALUES ($1,$2)',[linkMetadata,text_post])
}

export function hastagTrending(){
  
}