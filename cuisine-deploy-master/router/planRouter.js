const express = require("express");
const planRouter = express.Router();
//protectRoute
const {protectRoute} = require("../controller/authController");

const {
    getAllPlans,
    createPlan,
    getPlan,
    updatePlan,
    deletePlan
} = require("../controller/planController");

const { isAuthorized } = require("../controller/authController");
// const { checkId } = require("../utility/utilityfn");
// planRouter.param("id", checkId);
// admin ,restaurantowner
planRouter.use(protectRoute);
// planRouter.use(isAuthorized(["admin","restaurantowner"]));
// createPlan
// updatePlan
// deletePlan
planRouter
    .route("")
    .get(getAllPlans)
    .post(createPlan);

planRouter
    .route("/:id")
    .get(getPlan)
    .patch(updatePlan)
    .delete(deletePlan);
    
module.exports = planRouter;