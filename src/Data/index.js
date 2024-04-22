import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("questions.json")
const middlewares = jsonServer.defaults();
const port = import.meta.env.PORT || 3000

server.use(middlewares)
server.use(router)
server.listen(port)