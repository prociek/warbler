require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./helpers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { authentication, authorization } = require("./middleware/auth");
const db = require("./models");
const { urlencoded } = require("body-parser");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  authentication,
  authorization,
  messagesRoutes
);
app.get("/api/messages", authentication, async (req, res, next) => {
  try {
    const messages = await db.Message.find({})
      .sort({ createdAt: "desc" })
      .populate("user", { username: true, profileImageUrl: true });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  return next(err);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
