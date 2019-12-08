const csvFilePath = __dirname + '/data/flights.csv';
const csv = require('csvtojson');
const cors = require('cors');


const whitelist = ['http://localhost:4000', 'http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const routes = (app) => {
    let result;
    app.route('/origin').get(cors(corsOptions), async (req, res, next) => {
        const flightInfo = await csv().fromFile(csvFilePath);
        result = extractOrigin(flightInfo);
        next();
    }, (req, res, next) => {
        res.send(result);
    });

    app.route('/flights/:origin').get(cors(corsOptions), async (req, res, next) => {
        const flightInfo = await csv().fromFile(csvFilePath);
        const search = req.params.origin;
        result = searchOrigin(flightInfo, search);
        next();
    }, (req, res, next) => {
        res.send(result);
    });
}

function extractOrigin(data) {
    let resArr = [];
    data.forEach((item) => {
        const flag = resArr.includes(item.origin);
        if (!flag) {
            resArr.push(item.origin);
        }
    });
    return resArr.sort();
}

function searchOrigin(data, search) {
    let resArr = [];
    data.forEach((item) => {
        if (item.origin === search) {
            resArr.push(item);
        }
    });
    return resArr;
}


export default routes;