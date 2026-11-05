const SID = "12403030216";
const BOOK_ID = "BOOK-" + SID;
const dbName = "bookshop";
const inventory = db.getSiblingDB(dbName).inventory;
inventory.deleteMany({});
inventory.insertOne({
    _id: BOOK_ID,
    title: "NoSQL数据库教材",
    stock: NumberInt(11),
    price: NumberDecimal("39.8")
});
let doc = inventory.findOne({_id:BOOK_ID});
printjson(doc);
print("\n各字段BSON类型：");
for(let k in doc){
    print(k + " : " + typeof doc[k]);
}
