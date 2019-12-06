const csvFilePath = __dirname + '/data/flights.csv';
const csv = require('csvtojson');

const routes = (app) => {
    let result;
    app.route('/origin').get(async (req, res, next) => {
        const flightInfo = await csv().fromFile(csvFilePath);
        result = extractOrigin(flightInfo);
        next();
    }, (req, res, next) => {
        res.send(result);
    });

    app.route('/flights/:origin').get(async (req, res, next) => {
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
        if(!flag){
            resArr.push(item.origin);
        }
    });
    return resArr;
}

function searchOrigin(data, search) {
    let resArr = [];
    data.forEach((item) => {
        if(item.origin === search){
            resArr.push(item);
        }
    });
    return resArr;
}


export default routes;