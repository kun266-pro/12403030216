学号：12403030216
个人参数：
SID = "12403030216"
BOOK_ID = "BOOK-12403030216"
Stock = 11
Buy = 2

运行环境：
mongosh + MongoDB Community 单机独立模式
说明：单机MongoDB不支持事务，事务代码语法正确，但运行会抛出事务相关异常；代码已经实现事务+回滚逻辑，满足题目要求。
无Redis。

依赖：MongoDB数据库、mongosh客户端

执行方法：
1. 打开mongosh，切换到对应task目录
2. load("init.js"); 加载初始化与函数
3. load("main.js"); 执行业务代码
4. 屏幕输出复制保存到result.txt

目录说明：
task1：原子更新库存，初始化代码、源代码、运行结果
task2：事务订购、4组测试场景、异常回滚
task3：BSON数据类型演示、类型说明
