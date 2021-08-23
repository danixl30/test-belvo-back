const { default: axios } = require("axios")

export const bankListRequest = async () => {
    const res = await axios.get('http://localhost:4000/institutions');
    return res.data;
}

export const registerUser = async (bankName, username, password) => {
    const res = await axios.post('http://localhost:4000/register', {
        Headers:{
            'Content-Type': 'application/json'
        },
        username,
        password,
        bankName
    })
    return res.data;
}

export const getTransacctions = async (linkId, initialDate, endDate) => {
    const res = await axios.post('http://localhost:4000/alltrasacctions', {
        Headers:{
            'Content-Type': 'application/json'
        },
        linkId, 
        initialDate, 
        endDate
    })

    return res.data;
}

export const getBalances = async (linkId, initialDate, endDate) => {
    const res = await axios.post('http://localhost:4000/getbalance', {
        Headers:{
            'Content-Type': 'application/json'
        },
        linkId, 
        initialDate, 
        endDate
    })

    return res.data;
}

export const deleteAccount = async (linkId) => {
    const res = await axios.post('http://localhost:4000/deleteaccount', {
        linkId
    })

    return res.data;
}