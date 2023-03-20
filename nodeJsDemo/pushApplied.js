const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "knowledgepr",
});

const router = express.Router(); // 创建新的路由实例

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.post("/", (req, res) => {
  const { title, difficulty } = req.body;
  const { componentData, canvasStyleData } = req.body;
  const { selectedPoints } = req.body;
  console.log("正在处理post请求...");
  // 查询当前最大的id值
  const getMaxIdSql = "SELECT MAX(id) AS maxId FROM igsys_applied";
  connection.query(getMaxIdSql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "保存题目失败！" });
    } else {
      const maxId = result[0].maxId;
      const newId = maxId ? maxId + 1 : 1;
      // 将数据保存到数据库中的igsys_applied表
      const sql = `INSERT INTO igsys_applied (id, title, difficulty, componentData, canvasStyleData) VALUES (?, ?, ?, ?, ?)`;
      console.log("sql111111111111111111111");
      connection.query(
        sql,
        [
          newId,
          title,
          difficulty,
          JSON.stringify(componentData),
          JSON.stringify(canvasStyleData),
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "保存题目失败！" });
          } else {
            res.json({ message: "保存题目成功" });
          }
        }
      );
      // 将数据保存到数据库中的applied_belong_kid表
      console.log("selectedPoints=", selectedPoints);
      const sql2 = `INSERT INTO applied_belong_kid (appliedid, kid) VALUES (?, ?)`;
      for (var kid of selectedPoints) {
        console.log("kid=", kid);
        connection.query(sql2, [newId, kid]);
      }
    }
  });
});

module.exports = router; // 导出路由实例
