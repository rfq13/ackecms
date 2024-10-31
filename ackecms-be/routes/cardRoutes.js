const router = require("express").Router();

const HttpResponse = require("../helpers/HttpResponse");
const Card = require("../models/Card");
const { chatCompletions } = require("../helpers/GroqAi");

// GET /api/cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().exec();
    const httpRsponse = HttpResponse.get({ data: cards });
    res.send(httpRsponse);
  } catch (err) {
    res.status(500).send({ message: "Error fetching cards" });
  }
});

// POST /api/cards/gen
router.post("/gen", async (req, res) => {
  const { chat } = req.body;
  if (!chat) {
    const httpRsponse = HttpResponse.baseResponse({
      code: 400,
      message: "Chat are required",
    });
    res.status(400).send(httpRsponse);
  } else {
    try {
      const aiGen = await chatCompletions(chat);
      console.log({ aiGen });
      const httpRsponse = HttpResponse.get({ data: aiGen });
      // const card = new Card({ title, description });
      // await card.save();
      // const httpRsponse = HttpResponse.created({
      //   code: 201,
      //   data: card,
      //   message: "Card created successfully",
      // });
      res.status(201).send(httpRsponse);
    } catch (err) {
      res.status(500).send({ message: "Error creating card" });
    }
  }
});

// POST /api/cards
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    const httpRsponse = HttpResponse.baseResponse({
      code: 400,
      message: "Title and description are required",
    });
    res.status(400).send(httpRsponse);
  } else {
    try {
      const card = new Card({ title, description });
      await card.save();
      const httpRsponse = HttpResponse.created({
        code: 201,
        data: card,
        message: "Card created successfully",
      });
      res.status(201).send(httpRsponse);
    } catch (err) {
      res.status(500).send({ message: "Error creating card" });
    }
  }
});

// PUT /api/cards/:id
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  if (!title || !description) {
    const httpRsponse = HttpResponse.baseResponse({
      code: 400,
      message: "Title and description are required",
    });

    res.status(400).send(httpRsponse);
  } else {
    try {
      const card = await Card.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );

      const httpRsponse = HttpResponse.updated({
        data: card,
        message: "Card updated successfully",
      });
      res.send(httpRsponse);
    } catch (err) {
      res.status(500).send({ message: "Error updating card" });
    }
  }
});

// DELETE /api/cards/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Card.deleteOne({ _id: id });

    res.send({ message: "Card deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error deleting card" });
  }
});

module.exports = router;
