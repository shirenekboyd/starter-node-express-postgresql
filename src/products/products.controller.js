const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// function productExists(req, res, next) {
//   productsService
//     .read(req.params.productId)
//     .then((product) => {
//       if (product) {
//         res.locals.product = product;
//         return next();
//       }
//       next({ status: 404, message: `Product cannot be found.` });
//     })
//     .catch(next);
// }

// refactored code using async await
async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res) {
  //const data = await productsService.read(req.params.productId)
  const { product: data } = res.locals;
  res.json({ data });
}

// function list(req, res, next) {
//   productsService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }

// refactored code using async await
async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

// listPriceSummary() handler which calls the getPriceSummary() query builder method in ProductsService
async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

//add the listTotalWeightByProduct() handler which calls the listTotleWeightByProduct() query builder method you added to productsService
async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}


module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list), 
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
