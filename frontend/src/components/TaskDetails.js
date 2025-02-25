import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/tasks/${id}/`);
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };
        fetchTask();
    }, [id]);

    if (!task) return <p>Loading...</p>;

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            {/* Add more task details as needed */}
        </div>
    );
