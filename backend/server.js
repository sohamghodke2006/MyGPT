import express from 'express';
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

fetch("/chat/completions");