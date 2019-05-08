import React from 'react';
import { Card, Typography, Button } from 'antd';
const { Text } = Typography;

export default function TaskCard({ task, handleDeleteTask, handleAssignTask }) {
    return (
        <Card
            style={{ marginBottom: "10px" }}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Text strong>{task.name}</Text>
                    <div>
                        {task.people}
                    </div>
                </div>
                <div>
                    <Button type="primary" ghost style={{ marginRight: "10px" }} onClick={() => handleAssignTask(task.id)}>Assign</Button>
                    <Button type="danger" ghost onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                </div>
            </div>

        </Card>
    )
}