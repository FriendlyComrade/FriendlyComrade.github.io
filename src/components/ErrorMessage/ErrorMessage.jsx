import {Link} from "react-router-dom"

const ErrorMessage = () => {
    return (
        <>
            <h1>Sorry, something went wrong...</h1>
            <p>
                Try to go back to the <Link to="/">Home page</Link>
            </p>
        </>
    );
};

export default ErrorMessage;