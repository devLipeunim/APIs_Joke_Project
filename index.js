import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for Data..." });
});

app.post("/get-joke", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "joke/Any?format=txt");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
})

app.post("/post-joke", async (req, res) => {
  const searchId = req.body.id;
  const amount = req.body.amountOfJokes;
  const checkedCategories = [];
  ["Programming", "Miscellaneous", "Dark", "Pun", "Spooky", "Christmas"].forEach(
    (category) => {
      if (req.body[category]) {
        checkedCategories.push(category);
      }
    })
  try {
    const result = await axios.get(API_URL + "joke/" + checkedCategories.join(",") + "?format=txt&idRange=" + searchId + "-318&amount=" + amount,
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
