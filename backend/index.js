import express from "express";
import Database from "better-sqlite3";

const port = 8000;
const app = express();
app.use(express.json());

const db = new Database("./db/product-manager.db", { verbose: console.log });

//Get all products from database
app.get("/api/products", (req, res) => {
  const products = db
    .prepare(
      `SELECT
      id,
      name,
      price,
      image,
      sku,
      description,
      category,
      slug,
      createdAt FROM products
    `
    )
    .all();
  // Get current date for comparing product age
  const currentDate = new Date();

  // Loop through each product and asign the isNew tag to product
  products.forEach((product) => {
    const productCreatedAt = new Date(product.createdAt);
    const timeDifference = currentDate - productCreatedAt;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    //Check if product publish date is in future then it will not show in the home page
    product.hide = productCreatedAt > currentDate;
    // Check if the product is created within the last 7 days
    product.isNew = daysDifference < 7;
    // Filter out the products that are marked to be hidden
  });
  const visibleProducts = products.filter((product) => !product.hide);
  res.json(visibleProducts);
});

// Get a product by id
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;

  const select = db.prepare(`
 SELECT
     id,
      name,
      price,
      image,
      sku,
      description,
      category,
      slug,
      createdAt FROM products  WHERE id = ?
    `);
  const rows = select.get(id);
  res.json(rows);
});
//app listen
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
