import React, { useState } from 'react';
import axios from 'axios';

function AssetUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/api/assets/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <label>
                Choose file:
                <input type="file" onChange={handleFileChange} />
            </label>
            <button type="submit">Upload</button>
        </form>
    );
}

export default AssetUpload;
