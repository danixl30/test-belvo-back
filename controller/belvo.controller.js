const belvo = require('belvo').default;

const client = new belvo(
    '73233013-2009-4137-820c-a453d82c3213',
    '4JdPDc@FLQmFAUMEH-@ir3k#U9YAoO6TVPihNbFG6xB-_umXQaSpG2P0ylD5b-c4',
    'https://sandbox.belvo.com'
)

exports.root = (req, response) => {
    //res.send('ok');
    //console.log(req.body.username || '');
    const {username, password, bankName} = req.body || '';

    client.connect()
    .then(function () {
        client.links.register(bankName, username, password)
        //client.links.register('erebor_mx_retail', 'bnk100', 'full')
        .then(function (res) {
            console.log(res);
            response.json(res);
        })
        .catch(function (error) {
            console.log(error);
            response.json(error);
        });
    });
}

exports.getIntitutions = (req, response) => {
    client.connect()
    .then(function () {
        client.institutions.list()
        .then(function (res) {
            console.log(res);
            response.json(res);
        })
        .catch(function (error) {
            console.log(error);
        });
    });
}

exports.getAllDetails = (req, res) => {
    let resJ;
    client.connect()
    .then(function () {
        client.accounts.retrieve('37733e57-5ed2-4c85-877e-f8727a9995d7')
        .then(function (res) {
            console.log(res);
            resJ = res
        })
        .catch(function (error) {
            console.log(error);
        });
    });
    res.json(resJ);
}

exports.getAllTrasacctions = (req, response) => {
    console.log(req.body.linkId);
    const {linkId, initialDate, endDate} = req.body || '';
    client.connect()
    .then(function () {
        client.transactions.retrieve(linkId, initialDate, { 'dateTo': endDate })
        //client.transactions.retrieve('37733e57-5ed2-4c85-877e-f8727a9995d7', '2020-01-01', { 'dateTo': '2020-12-31' })
        .then(function (res) {
            console.log(res);
            response.json(res);
        })
        .catch(function (error) {
            console.log(error);
            response.json(error);
        });
    });

}

exports.getBalance = (req, response) => {
    const {linkId, initialDate, endDate} = req.body || '';
    client.connect()
    .then(function () {
        client.balances.retrieve(linkId, initialDate, { 'dateTo': endDate})
        client.balances.retrieve('37733e57-5ed2-4c85-877e-f8727a9995d7', '2020-01-01', { 'dateTo': '2020-12-31' })
        .then(function (res) {
            console.log(res);
            response.json(res);
        })
        .catch(function (error) {
            console.log(error);
            response.json(error);
        });
    });
}

exports.deleteAccount = (req, response) => {
    console.log(req.body);
    const {linkId} = req.body || '';
    client.connect()
    .then(function () {
        client.links.delete(linkId)
        .then(function (res) {
            console.log(res);
            response.json(res);
        })
        .catch(function (error) {
            console.log(error);
            response.json(res);
        });
    });
}