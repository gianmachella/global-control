import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "dev2020..",
    port: 3306,
    database: "Cargo_Control_DB",
  },
});
