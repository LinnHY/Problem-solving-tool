const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const pullApplied = require("./pullApplied");
const pushApplied = require("./pushApplied");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// 合并 pullApplied 和 pushApplied 的路由
app.use("/api/knowledgepr/igsys_applied/pullApplied", pullApplied);
app.use("/api/knowledgepr/igsys_applied/pushApplied", pushApplied);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
