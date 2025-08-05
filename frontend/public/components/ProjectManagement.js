// File: /frontend/src/components/ProjectManagement.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/projects/");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
        setLoading(false);
    };

    const createProject = async () => {
        if (!newProjectName) return;

        setLoading(true);
        try {
            const response = await axios.post("/api/projects/", { name: newProjectName });
            setProjects([...projects, response.data]);
            setNewProjectName("");
        } catch (error) {
            console.error("Error creating project:", error);
        }
        setLoading(false);
    };

    const deleteProject = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`/api/projects/${id}/`);
            setProjects(projects.filter((project) => project.id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Project Management</h1>
            <div>
                <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter new project name"
                />
                <button onClick={createProject} disabled={loading}>
                    {loading ? "Loading..." : "Create Project"}
                </button>
            </div>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        {project.name}{" "}
                        <button onClick={() => deleteProject(project.id)} disabled={loading}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectManagement;
