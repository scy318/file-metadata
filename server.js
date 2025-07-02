const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

// 配置 multer：使用内存存储（无需实际保存文件，仅需元数据）
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 静态文件服务：托管 public 目录下的前端文件
app.use(express.static('public'));

// 根路径：返回上传表单页面
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 处理文件上传的 POST 接口
app.post('/upload', upload.single('upfile'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded!' });
  }
  // 提取文件元数据：名称、类型、大小（字节）
  const { originalname, mimetype, size } = file;
  res.json({ name: originalname, type: mimetype, size });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});