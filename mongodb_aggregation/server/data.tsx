/*
Example 1: Grouping and Summing

calculate the total quantity and total revenue for each item:

db.orders.aggregate([
    {
        $group: {
          _id: "$item",
          totalQuantity: { $sum: "$quantity" },
          totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } }
        }
      }
    ])

ANS:

{ "_id" : "banana", "totalQuantity" : 7, "totalPrice" : 7 }
{ "_id" : "orange", "totalQuantity" : 25, "totalPrice" : 20 }
{ "_id" : "apple", "totalQuantity" : 15, "totalPrice" : 18 }




Example 2: Filtering and Sorting
Assume you want to find the top 3 customers by their total purchase amount from a customers collection:

db.customers.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalPurchaseAmount: { $sum: "$purchaseAmount" }
    }
  },
  { $sort: { totalPurchaseAmount: -1 } },
  { $limit: 3 }
])

This pipeline groups customers by customerId, calculates their totalPurchaseAmount,
 sorts them in descending order by totalPurchaseAmount, and limits the output to the top 3 customers

Example 3: Using $lookup for Join Operations
Suppose you have a orders collection and a products collection, and you want to enrich orders with product details:

db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails"
    }
  },
  { $unwind: "$productDetails" },
  {
    $project: {
      _id: 1,
      productName: "$productDetails.name",
      quantity: 1,
      totalPrice: { $multiply: ["$quantity", "$productDetails.price"] }
    }
  }
])


In this pipeline:

$lookup performs a left outer join with the products collection based on productId.
$unwind deconstructs the productDetails array.
$project reshapes the documents to include only the necessary fields (_id, productName, quantity, totalPrice).
    */