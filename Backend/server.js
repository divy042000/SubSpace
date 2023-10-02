const express = require('express');
const app = express();
const port = 5000;
const blogRoutes=require('./routes/blogRoutes')

app.use('/api', blogRoutes);
// app.use('/api', blogRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
