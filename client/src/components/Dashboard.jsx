import React, { useEffect, useState } from "react";

// import ToolBar from "./dashboard/ToolBar";
import NavBar from "./dashboard/NavBar";
// import Table from "./dashboard/Table";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import UserHandler from "../handlers/UserHandler";

import blockSVG from "./dashboard/1.svg";
import unblockSVG from "./dashboard/2.svg";
import deleteSVG from "./dashboard/3.svg";
import api from "../http/api";

const Dashboard = () => {
    const [data, setData] = useState({ user: { fullName: "?" } });
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handler = new UserHandler(navigate, setUsers, setIsLoading, setData);

    useEffect(() => {
        handler.start();
        handler.fetchUsers();
    }, []);

    const handleCheckboxChange = (userId) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId ? { ...user, checked: !user.checked } : user
            )
        );
    };

    const handleSelectAll = (e) => {
        setIsChecked((prev) => !prev);
    };

    useEffect(() => {
        setUsers((prevUsers) =>
            prevUsers.map((user) => ({ ...user, checked: isChecked }))
        );
    }, [isChecked]);

    useEffect(() => {
        console.log(users);
    }, [users]);
    const TableRow = ({ user }) => {
        const {
            _id,
            fullName,
            position,
            email,
            lastLogin,
            isBlocked,
            checked,
        } = user;

        return (
            <tr>
                <th>
                    <label>
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={checked}
                            onChange={() => handleCheckboxChange(_id)}
                        />
                    </label>
                </th>
                <td>
                    {fullName}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                        {position}
                    </span>
                </td>

                <td>
                    <div>
                        <div className="font-bold">{email}</div>
                    </div>
                </td>
                <td>{lastLogin}</td>
                <th>{isBlocked ? "Blocked" : "Active"}</th>
            </tr>
        );
    };

    const Table = () => {
        return (
            <div className="overflow-x-auto ">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={isChecked}
                                        onChange={handleSelectAll}
                                    />
                                </label>
                            </th>
                            <th>
                                <div>
                                    <div className="font-bold">Full Name</div>
                                    <div className="text-sm opacity-50">
                                        Position
                                    </div>
                                </div>
                            </th>
                            <th>E-Mail</th>
                            <th>Last Login</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <TableRow user={user} key={user._id} />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>
                                <div>
                                    <div className="font-bold">Full Name</div>
                                    <div className="text-sm opacity-50">
                                        Position
                                    </div>
                                </div>
                            </th>
                            <th>E-Mail</th>
                            <th>Last Login</th>
                            <th>Status</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    };
    const handleBlock = async () => {
        try {
            const data = await api.put("/api/block", users);
            console.log(data.data.users);
            handler.start();
            handler.fetchUsers();
        } catch (error) {
            console.error("Error sending block request:", error);
        }
    };
    const handleUnBlock = async () => {
        try {
            await api.put("/api/unblock", users);

            handler.start();
            handler.fetchUsers();
        } catch (error) {
            console.error("Error sending unblock request:", error);
        }
    };

    const ToolBar = () => {
        return (
            <div className="flex space-x-5">
                <button
                    className="btn btn-warning"
                    type="button"
                    onClick={handleBlock}
                >
                    <img src={blockSVG} alt="block" />
                </button>
                <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleUnBlock}
                >
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
                            handler.start();
                            setUsers(response.data.users);
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

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="container mx-auto px-5">
                    <NavBar user={data.user.fullName} />
                    <ToolBar />
                    <Table />
                </div>
            )}
        </>
    );
};

export default Dashboard;
