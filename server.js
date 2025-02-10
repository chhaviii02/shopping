const app = require("./index"); // Import the Express app
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
