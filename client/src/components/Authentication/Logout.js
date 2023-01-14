import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    const logoutUser = () => {
       const loggedOutUser = JSON.parse(localStorage.removeItem("userInfo")); 
       if (loggedOutUser) {
        history.push("/");
       }
    }
    

   

    return (
        <div>
            <button onClick={logoutUser}>
                Logout
            </button>
        </div>
    )
};

export default Logout;
