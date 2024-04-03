const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./swagger')(app);

app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
