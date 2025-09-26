const catchAsync = require("../utils/catchAsync");

exports.getServerStatus = catchAsync(async (req, res, next) => {
  const serverHealth = {
    status: "UP",
    timestamp: new Date().toISOString(),
    message: "Server is healthy",
  };

  res.status(200).json(serverHealth);
});
