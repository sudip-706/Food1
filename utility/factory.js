const QueryHelper = require("../utility/utilityfn");
const ErrorExtender = require("../utility/ErrorExtender")

module.exports.createElement = function (ElementModel) {
    return async function create(req, res) {
      const recievedElement = req.body;
      try {
        let createdElement = await ElementModel.create(recievedElement);
        // send success response to client
        res.status(201).json({
          status: " success",
          data: createdElement,
        });
      } catch (err) {
        return next(new ErrorExtender("element could not be created", 404))
      }
    };
  }

module.exports.getAllElement = function (ElementModel) {
return async function getAll(req, res) {
    try {
    console.log("function reached")
    let willGetAllElementsPromise = new QueryHelper(ElementModel.find(), req.query);
    // console.log(willGetAllElementsPromise)
    // pageElements = filteredElements.slice(toSkip, toSkip + limit);
    
    let filteredElements = willGetAllElementsPromise.filter().sort().select().paginate();
    // console.log(filteredElements);
    let finalans = await filteredElements.query;
    // console.log(finalans)
    res.status(200).json({
        status: "all Elements recieved",
        data: finalans,
    });
    } catch (err) {
      next(new Error("Element could not be updated"));
      return;
    }
};
} 

module.exports.getElement = function (ElementModel) {
    return async function get(req, res) {
      try {
        // recieve id through params
        const { id } = req.params;
        const Element = await ElementModel.findById(id);
        if(!Element){
          return next(new ErrorExtender("element not found", 404))
        }
        res.json({
          status: "successfull",
          data: Element,
        });
      } catch (err) {
        next(Error("Something went wrong", 404))
        
      }
    };
}

module.exports.updateElement = function (ElementModel) {
    return async function update(req, res) {
      //  identifier => Element
      // const originalElement = Elements[id - 1];
      //fields to be updated in ur Element
      // local
      try {
        const id = req.params.id;
        const toupdateData = req.body;
        // mdb=> express server
        const originalElement = await ElementModel.findById(id);
        if(!originalElement){
          return next(new ErrorExtender("element not found", 404))
        }
        const keys = Object.keys(toupdateData)
        // express server => modify
        for (let i = 0; i < keys.length; i++) {
          originalElement[keys[i]] = toupdateData[keys[i]];
        }
        // express server=> modified=> mdb
        const updatedElement = await originalElement.save();
        
        // db********************************************************
        // update DB update =>old Element return
        res.status(200).json({
          status: "update request recieved",
          Element: updatedElement,
        });
      } catch (err) {
        console.log(err);
        next(Error("Something went wrong"))
        // res.status(501).json({
        //   status: "Element could not be updated",
        //   err,
        // });
      }
    };
  }
  module.exports.deleteElement = function (ElementModel) {
    return async function (req, res) {
      try {
        const id = req.params.id;
  
        const Element = await ElementModel.finByIdAndDelete(id);
        res.status(200).json({
          status: "Element Deleted",
          Element: Element,
        });
      } catch (err) {
        next(Error("Something went wrong"))
        // res.status(404).json({
        //   status: "Element could not be Deleted",
        //   err: err.message,
        // });
      }
  
    }
  
  } 
