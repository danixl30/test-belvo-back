import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { deleteAccount, getBalances, getTransacctions, listAcounts } from '../api/requestApi';

export default function HomeComponent() {

    const [initialDate, setInitialDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transacctions, setTransacctions] = useState(null);
    const [balances, setBalances] = useState(null);
    const [account, setAccount] = useState('');
    const [accounts, setAccounts] = useState();

    const {link_id} = useParams();
    const history = useHistory()

    const onChangeDates = (e) => {
        if (e.target.name === 'trip-start'){
            setInitialDate(e.target.value);
            console.log(initialDate);
        }

        if (e.target.name === 'trip-end'){
            setEndDate(e.target.value);
            console.log(endDate);
        }
    }

    const onClickTransacctions = async () => {
        if (initialDate !== '' && endDate !== ''){
            setBalances(null);
            let data = await getTransacctions(link_id, initialDate, endDate);
            console.log(data);
            if (data.statusCode){
                alert('Error');
                setAccount('');
                data = [];
            }
            if(account !== ''){
                let accountFiltered = data.filter(acco => acco.account.public_identification_value === account.public_identification_value)
                setTransacctions(accountFiltered);
            }else
                setTransacctions(data);
        }else{
            alert('The dates are empty');
        }
    }

    const onClickBalances = async () => {
        if (initialDate !== '' && endDate !== ''){
            setTransacctions(null);
            let data = await getBalances(link_id, initialDate, endDate);
            console.log(data);
            if (data.statusCode){
                alert('Error');
                setAccount('');
                data = [];
            }
            if(account !== ''){
                let balanceFiltered = data.filter(balance => balance.account.public_identification_value === account.public_identification_value)
                setBalances(balanceFiltered);
            }else
                setBalances(data);
        }else{
            alert('The dates are empty');
        }
    }

    const onClickLogOut = async () => {
        const data = await deleteAccount(link_id);
        history.replace('/');
    }

    const getAccounts = async () => {
        let  data = await listAcounts(link_id);
        //console.log(data);
        if (data.statusCode){
            alert('Error');
            setAccount('');
            data = [];
        }
        setAccounts(data);
    }

    useEffect(() => {
        getAccounts()
    }, [])

    return (
        <>
            <h1>home</h1>
            <div className="card" style={{padding:10}}>
                <label for="start">Start date:</label>
                <input type="date" id="start" name="trip-start"
                    value={initialDate}
                    min="2018-01-01" max="2021-8-20" onChange={onChangeDates}></input>
                <label for="start">End date:</label>
                <input type="date" id="end" name="trip-end"
                    value={endDate}
                    min="2018-01-01" max="2021-8-20" onChange={onChangeDates}></input>
                <div style={{marginTop:10}} className="container">
                    <div className="row">
                        <div className="col-4">
                            <button onClick={onClickTransacctions} class="btn btn-primary">Transacctions</button>
                        </div>
                        <div className="col">
                            <button onClick={onClickBalances} class="btn btn-primary">Balances</button>
                        </div>
                        <div className="col">
                            <button onClick={onClickLogOut} type="button" class="btn btn-danger">Log out</button>
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Accounts
                    </button>
       
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item" onClick = {(e) => setAccount('')}>All</a></li>
                        {accounts && accounts.length > 0 && accounts.map((accountItem, index) => 
                            <li key={index}><a className="dropdown-item" onClick = {(e) => setAccount(accountItem)}>{accountItem.public_identification_name}</a></li>
                        )}
                    </ul>
                </div>
            </div>
            {transacctions && 
                <>
                    <table className="table">
                         <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Currency</th>
                            <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacctions.map((transacction, index) => 
                                <tr key={index}>
                                    <td>{transacction.reference}</td>
                                    <td>{transacction.category}</td>
                                    <td>{transacction.description}</td>
                                    <td>{transacction.amount}</td>
                                    <td>{transacction.currency}</td>
                                    <td>{transacction.value_date}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            }
            {balances && balances.length > 0 &&
                <>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Current balance</th>
                            <th scope="col">balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {balances.map((balance, index) => 
                                <tr key = {index}>
                                    <td>{balance.value_date || ''}</td>
                                    <td>{balance.current_balance || ''}</td>
                                    <td>{balance.balance || ''}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}
