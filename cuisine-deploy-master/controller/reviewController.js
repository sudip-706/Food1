const reviewModel = require("../model/reviewModel")
const factory = require("../utility/factory")

// async function createReview(req,res){
//     try{
//         const reviews = await reviewModel.create(req.body);
//         res.status(200).json({
//             reviews
//         })
//     }catch(err){
//         res.status(200).json({
//             err: err.message
//         })
// }
// }

// async function getAllReviews(req,res){
//     try{
//         const reviews = await reviewModel.find();
//         // .populate({
//         //     path :"user",
//         //     select :"name profileImage"
//         // }).populate("plan");
//         res.status(200).json({
//             reviews
//         })
//     }catch(err){
//         res.status(200).json({
//             err: err.message
//         })
//     }
// }
module.exports.createReview = factory.createElement(reviewModel);
module.exports.getAllReviews = factory.getAllElement(reviewModel);