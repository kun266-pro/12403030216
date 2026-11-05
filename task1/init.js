const SID = "12403030216";
const BOOK_ID = "BOOK-" + SID;
const Stock = 11;
const Buy = 2;
const dbName = "bookshop";
const inventory = db.getSiblingDB(dbName).inventory;
const orders = db.getSiblingDB(dbName).orders;

function resetData(){
    inventory.deleteMany({});
    orders.deleteMany({});
    inventory.insertOne({
        _id: BOOK_ID,
        title: "NoSQL数据库教材",
        stock: Stock
    });
}
