import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { bankListRequest, registerUser } from '../api/requestApi';
import GlobalItemSate from '../hooks/itemHook';

export default function LoginComponent() {
    const [getItem, insertItem] = GlobalItemSate();
    const [bank, setBank] = useState();
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const {index, bank_name} = useParams();
    const history = useHistory()

    const getBank = async () => {
        const data = await bankListRequest();
        await setBank(data[parseInt(index)]);
        console.log(bank)
    }

    const onChangeCamp = (e) => {
        if (e.target.name === 'userCamp'){
            setUsername(e.target.value);
            console.log(Username);
        }

        if (e.target.name === 'passwordCamp'){
            setPassword(e.target.value);
            console.log(password);
        }
    }

    const onSubmit = async () => {
        if (Username.trim() !== '' && password.trim() !== ''){
            const data = await registerUser(bank_name, Username, password);
            if (data.id){
                console.log(data.id);
                history.replace('/home/'+ data.id);
            }else{
                alert('Error login');
            }
        }
    }

    useEffect(() => {
        //console.log(getItem());
        getBank()
    }, [getItem()])
    return (
        <div className="container">
            <h1>Login</h1>
            {bank && 
                <img style={{padding:20}} src = {bank.icon_logo} />
            }
            <div className="card" style={{width:'18rem', padding:15}}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={onChangeCamp}name="userCamp" aria-describedby="emailHelp" placeholder="Enter your username" value={Username}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="passwordCamp" className="form-control" onChange={onChangeCamp} id="exampleInputPassword1" placeholder="Password" value={password}/>
                </div>
                <button type="submit" onClick={onSubmit} className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}

