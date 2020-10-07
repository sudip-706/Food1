const mongoose = require("mongoose");
const DB_LINK = process.env.DB_LINK||require("../config/secrets").DB_LINK;// connection
mongoose
  .connect(
    DB_LINK,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(function (db) {
    // console.log(db);
    console.log("reviewDB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const reviewSchema = new mongoose.Schema({
    review:{
        type : String
        
    },
    rating : {
        type: Number,
        max: 10,
        min: 1,
        required :true
    },

    createdAt:{
        type: Date,
        default: Date.now
    },
    plan:{
        type: mongoose.Schema.ObjectId,
        ref: "newplanmodels",
        required: [true,"Review must belog to a plan"]
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"newusermodels",
        require:[true,"We need a user"]
    }

})

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage"
  }).populate("plan");
  next();
})

const reviewModel = mongoose.model("reviewmodles", reviewSchema);
module.exports = reviewModel;