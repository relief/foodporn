const express = require("express");
const fs = require("fs");
const sqlite = require("sql.js");

const filebuffer = fs.readFileSync("db/foodporn.sqlite3");

const db = new sqlite.Database(filebuffer);

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const COLUMNS = [
  "Id",
  "TrimURL",
  "OURL",
  "Restaurant_Id",
  "Restaurant"
];

const RESTAURANT_COLUMNS = [
  "Id",
  "Name",
  "Rating",
  "ReviewCount",
  "Price",
  "Style",
  "Neighborhood",
  "Address",
  "PhoneNumber",
  "Link",
];

app.get("/api/food", (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(
    `
      select ${COLUMNS.join(", ")} from entries
      where Id>${param}
      limit 100
    `
  );

  if (r[0]) {
    res.json(
      r[0].values.map(entry => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
            e[c] = entry[idx];
        });
        return e;
      })
    );
  } else {
    res.json([]);
  }
});

app.get("/api/rest", (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(
    `
      select * from restaurants
      where Id=${param}
    `
  );

  if (r[0]) {
    res.json(
      r[0].values.map(entry => {
        const e = {};
        RESTAURANT_COLUMNS.forEach((c, idx) => {
          // combine fat columns
            e[c] = entry[idx];
        });
        return e;
      })
    );
  } else {
    res.json([]);
  }
});


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
