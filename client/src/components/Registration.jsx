import { Link, useNavigate } from "react-router-dom";
import api from "../http/api";
import { useState } from "react";
import Loader from "./Loader";
const Registration = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState("");
    const [fullname, setFullname] = useState("");

    const [error, setError] = useState(false);

    setInterval(() => {
        setIsLoading(false);
    }, 200);

    async function registration() {
        setError(false);
        try {
            const response = await api.post("/api/registration", {
                email,
                password,
                position,
                fullName: fullname,
            });
            navigate("/");
        } catch (e) {
            console.log(e);

            setError(e.response.data.message);
        }
    }
    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="flex justify-center	h-screen items-center">
                    <div className="w-1/3 bg-base-300 rounded-lg p-5 flex flex-col align-center justify-center text-primary-content space-y-5">
                        {error && (
                            <div className="alert alert-error bg-red-400">
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
                        <h1 className=" font-bold	text-2xl text-center my-5">
                            Register and enter your account
                        </h1>
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="fullname"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Full Name
                                </label>
                            </div>
                            <div className="my-2 w-full">
                                <input
                                    type="text"
                                    id="fullname"
                                    value={fullname}
                                    required
                                    placeholder="Enter your full name"
                                    className="input input-bordered input-primary w-full "
                                    onChange={(e) =>
                                        setFullname(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="position"
                                    className="block text-sm font-medium leading-6 "
                                >
                                    Position
                                </label>
                            </div>
                            <div className="my-2 w-full">
                                <input
                                    id="position"
                                    type="text"
                                    placeholder="Enter your position"
                                    className="input input-bordered w-full input-primary"
                                    value={position}
                                    onChange={(e) =>
                                        setPosition(e.target.value)
                                    }
                                />
                            </div>
                        </div>
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
                                    placeholder="Enter your email address"
                                    className="input input-bordered input-primary w-full "
                                    value={email}
                                    required
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
                                    placeholder="Enter your password"
                                    required
                                    min={3}
                                    max={15}
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
                            onClick={() => registration()}
                        >
                            Registrate
                        </button>
                        <div className="flex justify-between w-full items-center">
                            <p></p>
                            <p>
                                Already Have An Account?
                                <Link
                                    className="btn btn-primary btn-outline ml-5 capitalize"
                                    to="/login"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Registration;
