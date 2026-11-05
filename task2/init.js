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

function placeOrder(orderId, isError){
    let session = db.getMongo().startSession();
    session.startTransaction();
    try{
        let invColl = inventory.withSession(session);
        let ordColl = orders.withSession(session);

        let book = invColl.findOne({_id: BOOK_ID});
        if(!book || book.stock < Buy){
            throw new Error("库存不足");
        }
        invColl.updateOne({_id:BOOK_ID}, {$inc:{stock:-Buy}});
        ordColl.insertOne({
            _id: orderId,
            bookId: BOOK_ID,
            studentId: SID,
            quantity: Buy
        });
        if(isError){
            throw new Error("模拟异常，触发回滚");
        }
        session.commitTransaction();
        session.endSession();
        return {ok:true};
    }catch(e){
        session.abortTransaction();
        session.endSession();
        return {ok:false, msg:e.message};
    }
}
