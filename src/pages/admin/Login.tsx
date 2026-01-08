import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/lib/api/axiosInstance";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const LoginHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post("login", {
                email,
                password
            });
            if (response) {
                localStorage.setItem("token", response?.data?.data?.token);
                toast.success("Login successfully");
                navigate("/admin/dashboard");
            }
        } catch (error) {
            console.log(`Login error ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome To Cocoma Studios
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Please login to your account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={LoginHandler} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />

                            {/* Show / Hide Icon */}
                            {password.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary/500 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
