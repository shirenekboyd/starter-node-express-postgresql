const categoriesService = require("./categories.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// async function list(req, res) {
//   const data = await categoriesService.list();
//   res.json({ data });
// }


// refactored code to include try/catch blocks for error handling
async function list(req, res, next) {
  try {
    const data = await categoriesService.list();
    res.json({ data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};