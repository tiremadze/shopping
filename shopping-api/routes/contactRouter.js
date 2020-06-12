const express = require("express");
const router = express.Router();
const fs = require("fs");
const messagesFile = appRoot + "/data/messages.json";

router.post("/", (req, res) => {
  const message = req.body;

  fs.readFile(messagesFile, (error, data) => {
    if (error) {
      console.log(error);
    }

    const messagesData = JSON.parse(data.toString());
    messagesData.messages.push(message);
    fs.writeFile(messagesFile, JSON.stringify(messagesData), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  res.send("Message sent.");
});

module.exports = router;
