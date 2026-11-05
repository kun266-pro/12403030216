resetData();
let res = inventory.updateOne(
    {
        _id: BOOK_ID,
        stock: {$gte: Buy}
    },
    {$inc: {stock: -Buy}}
);
printjson(res);
print("更新后库存：");
printjson(inventory.findOne({_id:BOOK_ID}));
