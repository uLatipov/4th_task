import React from "react";
import api from "../../http/api";
import { useNavigate } from "react-router-dom";

const NavBar = ({ user }) => {
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const response = await api.get("/api/logout");
            console.log(response);
            navigate("/login");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="navbar bg-base-100 mb-10">
            <div className="flex-1"></div>
            <div className="flex-none">
                <p className="mx-5">
                    Hi, <span> {user}</span>
                </p>
                <button
                    className="btn btn-outline btn-error"
                    type="button"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default NavBar;
