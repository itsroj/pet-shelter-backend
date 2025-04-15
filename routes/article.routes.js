const router = require("express").Router();
const ArticleModel = require("../models/Article.model");
const uploader = require("../middlewares/cloudinary.middleware")

//post to create a article
router.post("/create", uploader.single("image"), async (req, res) => {
  ArticleModel.create({...req.body, image: req.file.path})
    .then((responseFromDB) => {
      console.log("article created!", responseFromDB);
      res.status(201).json(responseFromDB);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Trouble creating your article" });
    });
});

//route to get all articles
router.get("/all-articles", async (req, res) => {
  ArticleModel.find()
    .populate("author")
    .then((responseFromDB) => {
      console.log("Here are all the articles", responseFromDB);
      res.status(200).json({
        allArticles: responseFromDB,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Trouble finding all the articles" });
    });
});

//route to get one article
router.get("/one-article/:articleId", async (req, res) => {
  try {
    const oneArticleInDB = await ArticleModel.findById(req.params.articleId);
    res.status(200).json(oneArticleInDB);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Trouble finding one article" });
  }
});

//update the article title
router.patch("/update-article/:articleId", uploader.single("image"), (req, res) => {
  if (req.file) {
    ArticleModel.findByIdAndUpdate(req.params.articleId, {...req.body, image: req.file.path}, { new: true })
    //.populate("owner")
    .then((updatedArticle) => {
      console.log("article updated", updatedArticle);
      res.status(200).json(updatedArticle);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: "Trouble finding all the articles" });
    });
  } else {
    ArticleModel.findByIdAndUpdate(req.params.articleId, {...req.body}, { new: true })
      //.populate("owner")
      .then((updatedArticle) => {
        console.log("article updated", updatedArticle);
        res.status(200).json(updatedArticle);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: "Trouble finding all the articles" });
      });
  }
});

//delete a article
router.delete("/delete-article/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    const deletedArticle = await ArticleModel.findByIdAndDelete(articleId);
    console.log("article deleted", deletedArticle);
    res.status(204).json({ message: "article deleted" });
  } catch (error) {
    console.log(err);
    res.status(500).json({ errorMessage: "Trouble deleting the article" });
  }
});

module.exports = router;