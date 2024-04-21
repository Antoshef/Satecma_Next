import mysql from "mysql";

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
});

export default pool;

export async function queryAsync<T>(query: string, params: any[] = []) {
  const results = await new Promise<T>((resolve, reject) => {
    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
  return results;
}
