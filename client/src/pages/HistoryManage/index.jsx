import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table, message } from 'antd';
import axios from 'axios';

const HistoryManagement = () => {
    const [data, setData] = useState([]);
    const location = useLocation()
    const { userId } = location.state
    const [loading, setLoading] = useState(false);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/history/getHistoryByUser', {
                params: { userId },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
            message.error(error.response?.data?.message || 'Đã xảy ra lỗi khi lấy dữ liệu!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchHistory();
        }
    }, [userId]);

    const columns = [
        {
            title: 'Tên bài thi',
            dataIndex: 'examTitle',
            key: 'examTitle',
        },
        {
            title: 'Thời gian nộp',
            dataIndex: 'submittedAt',
            key: 'submittedAt',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Số câu đúng',
            dataIndex: 'correctAnswer',
            key: 'correctAnswer',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Link to={`/history-result/${record?.historyId}/${record?.examId}`}>
                    Xem chi tiết
                </Link>

            ),
        },
    ];

    return (
        <div className="history-management">
            <h2>Quản Lý Lịch Sử Thi</h2>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="historyId"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default HistoryManagement;
