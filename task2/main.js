resetData();
// T1
(async ()=>{
    print("===== T1 正常订购 =====");
    let r1 = placeOrder("req_t1_001", false);
    let inv1 = inventory.findOne({_id:BOOK_ID});
    let ordCnt1 = orders.countDocuments({});
    let succ = r1.ok ? 1 : 0;
    let fail = r1.ok ? 0 : 1;
    let checkOk = "否";
    if(succ === 1 && inv1.stock === 9 && ordCnt1 === 1) checkOk = "是";
    print("(1)场景编号：T1 正常订购");
    print("(2)初始库存：",Stock);
    print("(3)购买数量：",Buy);
    print("(4)成功次数：",succ);
    print("(5)失败次数：",fail);
    print("(6)最终库存：",inv1.stock);
    print("(7)最终订单数量：",ordCnt1);
    print("(8)是否通过本人编写的核验：",checkOk);
})();

resetData();
// T2
(async ()=>{
    inventory.updateOne({_id:BOOK_ID},{$set:{stock:1}});
    print("\n===== T2 库存不足 =====");
    let r2 = placeOrder("req_t2_001", false);
    let inv2 = inventory.findOne({_id:BOOK_ID});
    let ordCnt2 = orders.countDocuments({});
    let succ = r2.ok ? 1 : 0;
    let fail = r2.ok ? 0 : 1;
    let checkOk = "否";
    if(succ === 0 && inv2.stock === 1 && ordCnt2 === 0) checkOk = "是";
    print("(1)场景编号：T2 库存不足");
    print("(2)初始库存：",1);
    print("(3)购买数量：",Buy);
    print("(4)成功次数：",succ);
    print("(5)失败次数：",fail);
    print("(6)最终库存：",inv2.stock);
    print("(7)最终订单数量：",ordCnt2);
    print("(8)是否通过本人编写的核验：",checkOk);
})();

resetData();
// T3
(async ()=>{
    print("\n===== T3 业务异常（回滚测试） =====");
    let r3 = placeOrder("req_t3_001", true);
    let inv3 = inventory.findOne({_id:BOOK_ID});
    let ordCnt3 = orders.countDocuments({});
    let succ = r3.ok ? 1 : 0;
    let fail = r3.ok ? 0 : 1;
    let checkOk = "否";
    if(succ === 0 && inv3.stock === 11 && ordCnt3 === 0) checkOk = "是";
    print("(1)场景编号：T3 业务异常（回滚测试）");
    print("(2)初始库存：",Stock);
    print("(3)购买数量：",Buy);
    print("(4)成功次数：",succ);
    print("(5)失败次数：",fail);
    print("(6)最终库存：",inv3.stock);
    print("(7)最终订单数量：",ordCnt3);
    print("(8)是否通过本人编写的核验：",checkOk);
})();

resetData();
// T4
(async ()=>{
    print("\n===== T4 连续多次订购 =====");
    let succ=0,fail=0;
    for(let i=0;i<6;i++){
        let ret = placeOrder("req_t4_"+i, false);
        if(ret.ok) succ++;
        else fail++;
    }
    let inv4 = inventory.findOne({_id:BOOK_ID});
    let ordCnt4 = orders.countDocuments({});
    let checkOk = "否";
    if(succ===5 && fail===1 && inv4.stock===1 && ordCnt4===5) checkOk = "是";
    print("(1)场景编号：T4 连续多次订购");
    print("(2)初始库存：",Stock);
    print("(3)购买数量：",Buy);
    print("(4)成功次数：",succ);
    print("(5)失败次数：",fail);
    print("(6)最终库存：",inv4.stock);
    print("(7)最终订单数量：",ordCnt4);
    print("(8)是否通过本人编写的核验：",checkOk);
})();
