import React from 'react';

function Header() {
    return (
        <nav className="navbar">
            <div className="container-fluid justify-content-center">
                <a href="https://www.concordium.com" target="_blank" rel="noreferrer">
                    <img src="/Concordium-Logo-Black.png" height="40" className="header-logo" alt="Concordium Logo" />
                </a>
            </div>
        </nav>
    );
}

export default Header;
