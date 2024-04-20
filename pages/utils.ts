import fs from "fs";

export const monthMapper = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const writeDotEnv = () => {
  const envKeys = Object.keys(process.env);

  let typeDefContent = `// This file is generated automatically. Do not edit.\ndeclare namespace NodeJS {\n  interface ProcessEnv {\n`;

  envKeys.forEach((key) => {
    typeDefContent += `    ${key}: string;\n`;
  });

  typeDefContent += `  }\n}\n`;

  fs.writeFileSync("env.d.ts", typeDefContent);
  console.log("env.d.ts file written successfully");
};

export const createDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`Directory ${dirPath} created`);
  }
};
