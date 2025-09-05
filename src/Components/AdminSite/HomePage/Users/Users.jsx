import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import * as API from '../../../Endpoint/Endpoint';

export default function RegisterUserForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
        companyId: "",
        userTypeId: "",
        createdBy: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
    });

    const [userImage, setUserImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setUserImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });
            if (userImage) {
                data.append("file", userImage);
            }

            const res = await axiosInstance.post(API.CREATEUSER, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setMessage(res.data.message || "✅ User registered successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                mobileNumber: "",
                companyId: "",
                userTypeId: "",
                createdBy: "",
                address: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
            });
            setUserImage(null);
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Register New User</h2>

            {message && (
                <p
                    className={`mb-4 p-2 rounded ${message.includes("success") || message.includes("✅")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {message}
                </p>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Left column */}
                <div className="flex flex-col">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Company ID</label>
                    <input
                        type="text"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>User Type ID</label>
                    <input
                        type="text"
                        name="userTypeId"
                        value={formData.userTypeId}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Created By</label>
                    <input
                        type="text"
                        name="createdBy"
                        value={formData.createdBy}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex flex-col col-span-2">
                    <label>Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        {loading ? "Registering..." : "Register User"}
                    </button>
                </div>
            </form>
        </div>
    );
}
