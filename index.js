// For local boot, uncomment the next line
require("dotenv").config();
const app = require("./backend/backend.js");
const port = 80;

app.listen(port, () => {
    console.log('Server listening on port ',port);
});   