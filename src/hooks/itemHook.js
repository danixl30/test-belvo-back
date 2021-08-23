import React, {useState} from "react";

const GlobalItemSate = () => {
    const [item, setItem] = useState();

    const getItem = () => {
        return item
    }

    const insertItem = (itemJ) =>{
        //console.log(itemJ);
        setItem(itemJ)
        console.log('success');
    }

    return [getItem, insertItem];
}

export default GlobalItemSate;