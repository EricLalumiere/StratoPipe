import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:8000/ws/comments/');

function CommentSection() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            setComments((prevComments) => [...prevComments, data]);
        };
    }, []);

    const handleSendComment = (e) => {
        e.preventDefault();
        client.send(
            JSON.stringify({
                content: newComment,
            })
        );
        setNewComment('');
    };

    return (
        <div>
            <h1>Comments</h1>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.content}</li>
                ))}
            </ul>
            <form onSubmit={handleSendComment}>
                <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default CommentSection;
