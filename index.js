import express from "express";
import morgan from 'morgan';
import { todoList } from "./todoList.js";
import { requestTime } from "./middleware.js"

const port = 3000;
const app = express();

// 機能5 : サードパーティのミドルウェアを適用
app.use(morgan('tiny'));

// 機能6 : 自作のミドルウェアを実装し適用
app.use(requestTime);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// 機能1：TodoリストをJSONで全件取得
// 機能4 : クエリパラメータでTodoリストを絞り込んで取得
app.get("/todo", (req, res) => {
  const param = req.query;
  const title = param.title;

  if (title) {
    const todo = todoList.filter(todo => todo.title.includes(title));
    res.json(todo);
  } else {
    res.json(todoList);
  }
});

// 機能3 : IDを指定して該当するTodoのJSONを取得
app.get('/todo/:todoId', (req, res) => {
  const id = Number(req.params.todoId);
  const todo = todoList.find(todo => todo.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).end();
  }
});

app.use(express.json());

// 機能2 : HTTP POSTリクエストで送信したJSONデータをそのまま返す
app.post("/todo", (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
