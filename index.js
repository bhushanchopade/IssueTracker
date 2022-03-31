const express = require("express");
require("dotenv").config()
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
// used for session cookie
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "issuetracker",
    // TODO change the secret before deployment
    secret: "akhileshkushwah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl:
      "mongodb+srv://bhushan:bhushan@issuetracker.xpb5o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      autoRemove: "disabled",
    }),
  })
);

//middleware for setting up the static files
app.use(express.static("./assets"));

// extract style and scripts from sub pages into the layout
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(flash());
app.use(customMware.setFlash);

//setting up the routes
app.use("/", require("./routes"));

//starting the app and listening to port
app.listen(port, (err) => {
  if (err) {
    console.log("Error in express server", err);
    return;
  }
  console.log("Express running fine on port : ", port);
});
