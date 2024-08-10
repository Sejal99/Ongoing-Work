export const getFilteredDeals = async (req, res) => {
    try {
      const categories=req.query.category // fashion,electronics
      const item=categories.split(',') //['fashion','elec']
      let arr=[]
    item.map((val)=>{
          arr.push({category:val})  
    })
      console.log(arr);//[{category:'fashion'},{category:"elect"}]
      const deals = await Deals.find({
        $or:arr   //deals.find({$or:[{category:'fashion'},{category:"elect"}]})
      });
      
      res.json(deals);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
//   //post method
//   export const getDik=async(req,res)=>{
//     try {
//       const c=req.body;
//       console.log(c.category);
//       const deals=await Deals.find({$or:c.category})
//       res.json(deals)
//     } catch (error) {
      
//     }
  