export default function Nav({ links }) { // typescript would really like a type declaration for this but idk how to give it one 😭
    return (
        <nav className="navbar navbar-expand-lg bg-secondary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {links.map((link) => link)}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

