import React, { useState } from "react";

function NewTransfer({ createTransfer }) {
    const [transfer, setTransfer] = useState(undefined);

    const submit = e => {
        e.preventDefault();
        createTransfer(transfer);
    }

    const updateTransfer = (e, field) => {
        const value = e.target.value;
        setTransfer({ ...transfer, [field]: value });
    }

    return (
        <div className="new-transfer">
            <h2>Create transfer</h2>
            <div className="new-transfer--form">
                <form onSubmit={(e) => submit(e)}>
                    <label htmlFor="amount">Amount</label><br />
                    <input id="amount" type="text" placeholder="100" onChange={e => updateTransfer(e, 'amount')} /><br />
                    <label htmlFor="to">To</label><br />
                    <input id="to" type="text" placeholder="0x..." onChange={e => updateTransfer(e, 'to')} /><br />
                    <input type="submit" value="Create" />
                </form>
            </div>
        </div>
    )
}

export default NewTransfer;
