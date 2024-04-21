// server.js
const { exec } = require("child_process");
const path = require("path");

// Set the PATH to include the local node_modules/.bin
const env = Object.create(process.env);
env.PATH = path.join(__dirname, "node_modules", ".bin") + ":" + env.PATH;

exec("next start", { env }, (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

/**  && tsc --project tsconfig.server.json  */
