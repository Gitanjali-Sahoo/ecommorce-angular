import express from "express";
import Database from "better-sqlite3";
import session from "express-session";
const port = 8000;
const app = express();
app.use(express.json());

app.use(
  session({
    secret: "123", // 🔐 Change this to something secure
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

const db = new Database("./db/product-manager.db", { verbose: console.log });
// Generate slug
function generateSlug(input) {
  return input
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Remove consecutive dashes
}
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

//Delete a product from db
app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const select = db.prepare(`
DELETE FROM products  WHERE id = ?
    `);
  const rows = select.run(id);
  if (rows.changes > 0) {
    res.json({ message: "Product has deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//Post a new product in to the DB
app.post("/api/products", (req, res) => {
  const newProduct = { ...req.body, slug: generateSlug(req.body.name) };

  const insert = db.prepare(`
    INSERT INTO products(
      name,
      price,
      image,
      sku,
      description,
      category,
      slug,
      createdAt
    ) VALUES (
      @name,
      @price,
      @image,
      @sku,
      @description,
      @category,
      @slug,
      @date)`);

  try {
    insert.run(newProduct);
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error inserting product:", error);
    res.status(500).json({ error: "Failed to add product." });
  }
});

//Cart functionality
app.get("/api/cart", (req, res) => {
  const sessionId = req.sessionID;

  const items = db
    .prepare(
      `
    SELECT cart.id, products.name, products.price,products.image,products.category, cart.quantity
    FROM cart
    JOIN products ON cart.product_id = products.id
    WHERE cart.session_id = ?
  `
    )
    .all(sessionId);
  console.log(items);
  const total = items.reduce(
    (sum, item) => sum + parseInt(item.price) * item.quantity,
    0
  );

  res.json({ items, total });
});
//Add a product to cart
app.post("/api/cart", (req, res) => {
  const { productId } = req.body;
  const sessionId = req.sessionID;

  const existing = db
    .prepare(
      `
    SELECT * FROM cart WHERE session_id = ? AND product_id = ?
  `
    )
    .get(sessionId, productId);

  if (existing) {
    db.prepare(`UPDATE cart SET quantity = quantity + 1 WHERE id = ?`).run(
      existing.id
    );
  } else {
    db.prepare(
      `INSERT INTO cart (product_id, quantity, session_id) VALUES (?, ?, ?)`
    ).run(productId, 1, sessionId);
  }

  res.json({ message: "Added to cart" });
});
// 🔁 PUT /cart/:id – Update quantity of a cart item
app.put("/api/cart/:id", (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;
  const sessionId = req.sessionID;

  db.prepare(
    `
    UPDATE cart SET quantity = ?
    WHERE id = ? AND session_id = ?
  `
  ).run(quantity, id, sessionId);

  res.json({ message: "Quantity updated" });
});

// ❌ DELETE /cart/:id – Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  const sessionId = req.sessionID;

  db.prepare(`DELETE FROM cart WHERE id = ? AND session_id = ?`).run(
    id,
    sessionId
  );

  res.json({ message: "Item removed from cart" });
});

//app listen
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
