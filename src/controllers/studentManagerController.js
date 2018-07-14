const xtpl = require("xtpl");
const path = require("path");
// 导入数据库包
const MongoClient = require("mongodb").MongoClient;

// 设置数据库url
const url = "mongodb://localhost:27017";

// 数据库名
const dbName = "student";

// 获取学生列表
exports.getStudentListPage = (req, res) => {
  const keyword = req.query.keyword || "";

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      //获取数据库操作的对象
      const db = client.db(dbName);

      //拿到集合，查询集合中的所有数据
      const collection = db.collection("studentInfo");

      collection.find({ name: { $regex: keyword } }).toArray((err, docs) => {
        client.close();

        xtpl.renderFile(
          path.join(__dirname, "../views/list.html"),
          { studentList: docs, keyword , loginedName: req.session.loginedName},
          (err, content) => {
            res.send(content);
          }
        );
      });
    }
  );
};

// 获取新增学生页面
exports.addStudentPage = (req,res) => {
  xtpl.renderFile(
    path.join(__dirname, "../views/add.html"),
    { },
    (err, content) => {
      res.send(content);
    }
  );
}

// 新增学生
exports.addStudent = (req,res) => {
  const result = {status: 0,message: '新增成功'}
  const data = req.body
  MongoClient.connect(url,{ useNewUrlParser: true },function(err, client) {
      //获取数据库操作的对象
      const db = client.db(dbName);
      //拿到集合
      const collection = db.collection("studentInfo");

      // 查询学生信息，重名返回
      collection.findOne({ name: data.name },(err, doc) => {
        if (doc != null) {
          result.status = 1
          result.message = '该学生用户已经存在'
          client.close();
          res.json(result)
        } else{
          //不存在
          collection.insertOne(data,(err,result1)=>{
            // 判断插入结果是否失败，如果失败就是null
            if(result1 == null){
              result.status = 2
              result.message = "新增失败!"
            }
            client.close();
            res.json(result)
          })
        }
      });


      // 新增学生
      // collection.insert(data, function(err, result) {
      //   if (err) {
      //     result.status = 0;
      //     result.message = '新增失败'
      //     res.json(result)

      //   } else {
      //     result.status = 1;
      //     result.message = '新增成功'
      //     res.json(result)
      //   }
      // });
    }
  );
}

// 删除学生
exports.deleteStudent = (req,res) => {
  const id = req.query.id
  
}
