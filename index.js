const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Or serve your static HTML files appropriately

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
