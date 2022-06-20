import {
  sendPostsTimeline,
  authUserTimeline,
  postTimeline,
} from "../repositories/timelineRepositories";

export async function ControllerTimeline(req, res) {
  const { token } = req.headers;
  const isUserExist = await authUserTimeline(token);

  if (isUserExist.rows.length === 0) {
    return res.status(404).send("usuário não encontrado");
  }

  const data = await sendPostsTimeline();

  res.send(data.rows);
}

export async function controllerPostTimeline(req, res) {
  const { token } = req.body;
  const { postBody } = req.body;

  try {
    await postTimeline(postBody);
    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
}
