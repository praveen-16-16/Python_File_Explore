const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const multer = require('multer');
const cors = require('cors');
const path = require('path');




const app = express();
app.use(cors());
const port = 3001;
const upload = multer({ dest: 'uploads/' }); 


app.post('/api/run-python', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileExtension = path.extname(req.file.originalname);
  if (fileExtension !== '.py') {
    return res.status(400).json({ output: 'Please upload a valid Python file.' });
  }

  exec(`python ${filePath}`, (err, stdout, stderr) => {
   
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error removing file:', err);
      }
    });

    if (err) {
      return res.status(500).json({ output: stderr });
    }
    res.json({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
