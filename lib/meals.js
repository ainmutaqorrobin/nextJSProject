import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  //added promises to simulate real time delay in fetching data
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare("SELECT * FROM meals").all();
}
