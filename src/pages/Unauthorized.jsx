import { Link } from "react-router-dom";

function Unauthorized() {

    return (

        <div className="page-card">

            <h2>Access Denied</h2>

            <p>
                You are not authorized to access this page.
            </p>

            <Link to="/">
                <button className="action-btn">
                    Return to Dashboard
                </button>
            </Link>

        </div>

    );

}

export default Unauthorized;