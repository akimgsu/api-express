import express from 'express';
import routes from './src/routes/flightRoutes';

const PORT = 4000;
const app = express();

routes(app);

app.get('/', (req, res) => {
    res.send(`Node and express server running on port ${PORT}`);
})


app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})

