const router = require("express").Router({ mergeParams: true });
const {
  createMessage,
  getMessage,
  deleteMessage,
} = require("../helpers/messages");

router.post("/", createMessage);
router.route("/:message_id").post(getMessage).delete(deleteMessage);

module.exports = router;
