const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// 创建与MySQL数据库的连接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "knowledgepr",
});

const router = express.Router(); // 创建新的路由实例
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// 获取所有可用的题目ID列表
router.get("/ids", (req, res) => {
  const sql = "SELECT id, title, difficulty FROM igsys_applied";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "获取题目ID列表失败！" });
    } else {
      const ids = result.map((item) => {
        return { id: item.id, title: item.title, difficulty: item.difficulty };
      });
      res.json(ids);
    }
  });
});
// 获取所有可用的知识点列表
router.get("/kps", (req, res) => {
  const sql = "SELECT kid, knowledge_name FROM knowledge_point";
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "获取知识点列表失败！" });
    } else {
      const kps = result.map((item) => {
        return { id: item.kid, name: item.knowledge_name };
      });
      res.json(kps);
    }
  });
});

// 获取单个题目的具体数据
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM igsys_applied WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "获取题目数据失败！" });
    } else {
      if (result.length === 0) {
        res.status(404).json({ message: "该题目不存在！" });
      } else {
        const data = result[0];
        res.json(data);
      }
    }
  });
});

module.exports = router; // 导出 app 对象
