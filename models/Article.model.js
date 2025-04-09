const { Schema, model } = require("mongoose");

const articleSchema = new Schema (
    {
        image: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        author: { type: String }
    }
);

const ArticleModel = model("Article", articleSchema);
module.exports = ArticleModel;