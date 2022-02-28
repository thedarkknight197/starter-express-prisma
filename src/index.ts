import express from 'express'
import routes from './routes/index';

const app = express();

app.use(express.json())

app.use(routes);

const server = app.listen(3000, () =>
  console.log(`
    🚀 Server ready at: http://localhost:3000
    ⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`
  ),
)
