import next from "next";
import { createServer } from "http";
import { parse } from "url";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { writeDotEnv } from "./pages/utils";

dotenv.config();
writeDotEnv();
const port = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req: any, res: any) => {
    const server = express();

    server.use(
      cors({
        origin:
          process.env.NODE_ENV === "production" ? process.env.PROD_ORIGIN : "*",
        methods: ["GET", "POST"],
        optionsSuccessStatus: 200,
      })
    );

    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/") {
        app.render(req, res, "/", query);
        return;
      } else if (pathname === "/store") {
        app.render(req, res, "/store", query);
        return;
      } else if (pathname === "/invoice") {
        app.render(req, res, "/invoice", query);
        return;
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occured handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  })
    .once("error", (err: any) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production" ? process.env.PROD_ORIGIN : "*",
//     methods: ["GET", "POST"],
//   })
// );

// // Apply middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res, next) => {
//   res.setHeader("X-Robots-Tag", "noindex, nofollow");
//   next();
// });

// createInvoice(app);
// getProducts(app);
// getEmails(app);

// app.use("/storage", express.static("/home/ecohomeg/application/storage"));

// app.get("*", (req, res, next) => {
//   res.sendFile(path.join("/home/ecohomeg/application/storage", "index.html"));
// });

// // 404 Error Handler
// app.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// });

// // Error Handler
// app.use((error: any, req: any, res: any, next: any) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//   res.status(statusCode);
//   console.error(error);
//   res.json({
//     message: error.message,
//     stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });
