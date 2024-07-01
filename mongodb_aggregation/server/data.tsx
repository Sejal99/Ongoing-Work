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







    */