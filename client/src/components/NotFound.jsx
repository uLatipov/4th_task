import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <main className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <p className="text-base text-red-300 font-semibold">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight  ">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 ">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="flex space-x-5 justify-center my-5">
                        <Link className="btn btn-primary" to="/register">
                            Registration
                        </Link>
                        <Link className="btn btn-ghost" to="/login">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
