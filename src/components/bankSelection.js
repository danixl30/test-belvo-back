import React, {useEffect, useState} from "react";
import { Redirect, useHistory } from "react-router-dom";
import { bankListRequest } from "../api/requestApi";
import GlobalItemSate from "../hooks/itemHook";


const BankSelecction = () => {
    const [banks, setBanks] = useState([]);
    const [getItem, insertItem] = GlobalItemSate();

    const history = useHistory()

    const getBanks = async () => {
        const data = await bankListRequest();
        setBanks(data);
    }

    const selectItem = async (index) => {
        //console.log(banks[index]);
        await insertItem(banks[index]);
        console.log(getItem);
        history.push(`login/${banks[index].name}/${index}`)
    }

    useEffect(() => {
        getBanks();
    }, [])

    return(
        <>
            <div className="position-relative container">
                <h1 className="display-1 position-relative">Banks compatible</h1>
                <div style={{padding:5}} className="row row-cols-3">
                    {banks.length > 0 && banks.map((bank, index) =>
                        <div className = "card col btn" style={{width: '18rem', padding: 5, margin:5}} onClick={(e) => selectItem(index)}>
                            <img src={bank.text_logo} style={{width: 300}} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className = "card-title">{bank.display_name + ' ' + bank.country_code}</h5>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BankSelecction;