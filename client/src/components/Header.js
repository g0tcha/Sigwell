import React from "react";

function Header({ quorum }) {
    return (
        <nav>
            <h1 className="nav--title">Sigwell</h1>
            <p className="nav--quorum">Quorum: {quorum}</p>
        </nav>
    );
}

export default Header;