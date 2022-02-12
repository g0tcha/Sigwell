import React from "react";

function Approvers({ approvers }) {
    return (
        <div className="approvers">
            {approvers.map(function (approver) {
                return <p>{approver}</p>
            })}
        </div>
    )
}

export default Approvers