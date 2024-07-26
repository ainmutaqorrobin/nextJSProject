import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "us-east-1",
});
const db = sql("meals.db");

export async function getMeals() {
  //added promises to simulate real time delay in fetching data
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("Loading meals failed.");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug= ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extensions = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extensions}`;
  const bufferedImage = await meal.image.arrayBuffer();

  //STORING IMAGES IN LOCAL FILE SYSTEM
  // const stream = fs.createWriteStream(`public/images/${fileName}`);
  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error("Saving image failed!");
  //   }
  // });
  // meal.image = `/images/${fileName}`;

  //STORING IMAGES IN S3 BUCKET
  s3.putObject({
    Bucket: "robin-nextjs-share-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });
  
  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image,slug)
    VALUES (
        @title,
        @summary,     
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
         )
    `
  ).run(meal);
}
