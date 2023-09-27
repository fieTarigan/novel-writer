const router = require("express").Router();
const novelRouter = require("./novel");
const writerRouter = require("./writer");

router.get("/", (req, res) => {
  res.render("../views/index.ejs");
});

router.use("/novels", novelRouter);
router.use("/writers", writerRouter);

module.exports = router;
