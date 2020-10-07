const express = require("express");
const reviewRouter = express.Router();

const {getAllReviews , createReview}= require("../controller/reviewController")

reviewRouter.route("")
    .get(getAllReviews)
    .post(createReview);

module.exports = reviewRouter;