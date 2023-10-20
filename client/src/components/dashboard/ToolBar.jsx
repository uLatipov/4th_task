import React from "react";
import blockSVG from "./1.svg";
import unblockSVG from "./2.svg";
import deleteSVG from "./3.svg";
import api from "../../http/api.js";

const ToolBar = ({ users, start, fetchUsers }) => {
    return (
        <div className="flex space-x-5">
            <button className="btn btn-warning" type="button">
                <img src={blockSVG} alt="block" />
            </button>
            <button className="btn btn-success" type="button">
                <img src={unblockSVG} alt="Unblock" />
            </button>
            <button
                className="btn"
                type="button"
                onClick={async () => {
                    try {
                        const response = await api.post("/api/delete", {
                            users,
                        });
                        start();
                        fetchUsers();
                        console.log(response);
                    } catch (e) {
                        console.log(e);
                    }
                }}
            >
                <img src={deleteSVG} alt="delete" />
            </button>
        </div>
    );
};

export default ToolBar;
