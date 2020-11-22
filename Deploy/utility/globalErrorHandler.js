module.exports = function(err, req,res,next){
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "uknown error";
    if(process.env.NODE_ENV == "production"){
        sendProdError(err,req,res);
    }else{
        sendDevError(err,req,res)
    }
}

function sendDevError(err, req, res) {
    // API Response
    if (req.originalUrl.includes("/api")) {
      return res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack,
        status: err.status
      })
    } else {
      res.status(err.statusCode).render("error.pug", {
        title: "Something Went Wrong",
        msg: err.message
      })
    }
}
  // logic => application plug 
  // error type
  function sendProdError(err, req, res) {
  //   pending HW
    if (err.isOperational) {
      // API
      // UI
      res.status(err.statusCode).json({
        message: err.message,
        status: err.status
      })
    } else {
      // API
      // UI
      res.status(err.statusCode).json({
        message: "Something Went Wrong",
        status: "error"
      })
    }
  }