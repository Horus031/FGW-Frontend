import { useState } from "react";
import { devLogin } from "../../api/requests/dev.api";
import LogoWithName from "../icons/LogoWithName";

const DevLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const user = await devLogin(email, password);
            console.log("Login successful:", user);

            // You can redirect or set Zustand store here
            window.location.href = "/dashboard";
        } catch (err: any) {
            console.error(err);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-xl shadow-md w-[400px]">
            <div className="flex flex-col items-center gap-6">
                <LogoWithName />

                <h2 className="text-2xl font-semibold text-primary">Developer Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-secondary text-white font-medium py-2 rounded-md hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-xs text-gray-500">
                    For developer debugging only.
                </p>
            </div>
        </div>
    );
};

export default DevLoginForm;
