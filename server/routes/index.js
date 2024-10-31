const router = require("express").Router();

const cardRouter = require("./cardRoutes");

router.use("/api/cards", cardRouter);

module.exports = router;
