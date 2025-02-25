import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/projects/${id}/`);
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject();
    }, [id]);

    if (!project) return <p>Loading...</p>;

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {/* Add more project details as needed */}
        </div>
    );
}

export default ProjectDetail;
