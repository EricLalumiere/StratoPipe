import React, { useState } from "react";
import axios from "axios";
import "../styles/AssetUpload.css";


function AssetUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/assets/upload/",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setMessage(response.data.message || "Asset uploaded successfully!");
            window.location.href = "/assets.html";
        } catch (error) {
            setMessage(error.response?.data?.error || "Asset upload failed!");
        }
    };

    return (
        <div className="asset-upload-container">
            <h2>Upload Asset</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default AssetUpload;
