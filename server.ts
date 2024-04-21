import dotenv from "dotenv";
import { createServer } from "http";
import next from "next";
import { parse } from "url";
import { writeDotEnv } from "./utils/utils";

dotenv.config();
writeDotEnv();
const port = Number(process.env.PORT) || 3001;
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req: any, res: any) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl); // This line handles all routing, including API routes
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
