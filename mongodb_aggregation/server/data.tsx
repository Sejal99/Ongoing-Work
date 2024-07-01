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


    */