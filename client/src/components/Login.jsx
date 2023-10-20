import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../http/api";
import Loader from "./Loader";

const Login = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const LoginHandler = async () => {
        setError(false);
        try {
            await api.post("/api/login", {
                email,
                password,
            });

            navigate("/");
        } catch (e) {
            setError(e?.response?.data?.message);
            console.log(e);
        }
    };

    setInterval(() => {
        setIsLoading(false);
    }, 200);

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="flex justify-center	h-screen items-center">
                    <div className="w-1/3 bg-base-300 rounded-lg p-5 flex flex-col align-center justify-center text-primary-content space-y-5">
                        <h1 className=" font-bold	text-2xl text-center my-10">
                            Enter your account
                        </h1>
                        {error && (
                            <div className="alert alert-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Email
                                </label>
                            </div>
                            <div className="my-2 w-full">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    className="input input-bordered input-primary w-full "
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 "
                                >
                                    Password
                                </label>
                            </div>
                            <div className="my-2 w-full">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password here"
                                    required
                                    className="input input-bordered w-full input-primary"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={LoginHandler}
                        >
                            Login
                        </button>
                        <div className="flex justify-between w-full items-center">
                            <p></p>
                            <p>
                                Don't Have An Account?
                                <Link
                                    className="btn btn-primary btn-outline ml-5 capitalize"
                                    to="/register"
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
