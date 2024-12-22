import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, message, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashBoard = () => {
    const [todaySignups, setTodaySignups] = useState(0);
    const [yesterdaySignups, setYesterdaySignups] = useState(0);
    const [growthRate, setGrowthRate] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0); // Tổng số lượt làm bài
    const [dailyAttempts, setDailyAttempts] = useState(0); // Tổng số lượt làm bài trong ngày
    const [data, setData] = useState([]);

    const fetchExamStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/history/statistics'); // Đường dẫn API
            setTotalAttempts(response.data.totalAttempts); // Cập nhật tổng số lượt làm bài
            setDailyAttempts(response.data.dailyAttempts); // Cập nhật số lượt làm bài trong ngày
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            message.error('Không thể tải dữ liệu thống kê.');
        }
    };
    // Hàm gọi API để lấy số người đăng ký
    const fetchSignups = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/daily-signups'); // Đường dẫn API
            const { todaySignups, yesterdaySignups } = response.data;
            setTodaySignups(todaySignups);
            setYesterdaySignups(yesterdaySignups);

            // Tính tỷ lệ tăng
            const rate = yesterdaySignups > 0
                ? ((todaySignups - yesterdaySignups) / yesterdaySignups) * 100
                : todaySignups * 100; // Tránh chia cho 0
            setGrowthRate(rate.toFixed(2)); // Làm tròn 2 chữ số thập phân
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            message.error('Không thể tải dữ liệu thống kê.');
        }
    };

    const fetchMonthExamCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/history/getMonthlyExamCount');
            setData(response.data);  // Cập nhật dữ liệu vào state
        } catch (err) {
            console.error('Lỗi khi lấy dữ liệu:', err);
            message.error('Không thể tải dữ liệu thống kê.');
        }
    };
    console.log(data)
    useEffect(() => {
        fetchMonthExamCount()
        fetchExamStatistics();
        fetchSignups(); // Gọi API khi component được mount
    }, []);
    const chartData = {
        labels: data.length > 0 ? data.map(item => `${item._id.month}/${item._id.year}`) : [],
        datasets: [
            {
                label: 'Số lượt làm bài',
                data: data.length > 0 ? data.map(item => item.count) : [],
                fill: false, // Không tô màu dưới đường
                borderColor: 'rgba(75, 192, 192, 1)', // Màu đường
                tension: 0.1, // Độ cong của đường (càng gần 0, đường càng thẳng)
                borderWidth: 2
            }
        ]
    };

    const [totalUsers, setTotalUsers] = useState(0); // Trạng thái lưu số người dùng

    // Hàm gọi API để lấy tổng số người dùng
    const fetchTotalUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/total'); // Đường dẫn API
            setTotalUsers(response.data.totalUsers); // Cập nhật trạng thái
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
            message.error('Không thể tải dữ liệu thống kê.');
        }
    };

    useEffect(() => {
        fetchTotalUsers(); // Gọi API khi component được mount
    }, []);

    return (
        <div className="container" style={{ marginTop: '32px' }}>
            <div className="row" style={{ rowGap: 10 }}>
                <div className="col-xl-6 col-lg-6">
                    <div className="card l-bg-cherry">
                        <div className="card-statistic-3 p-4">
                            <div className="card-icon card-icon-large"><i className="fas fa-shopping-cart" /></div>
                            <div className="mb-4">
                                <h5 className="card-title mb-0">Số người dùng</h5>
                            </div>
                            <div className="row align-items-center mb-2 d-flex">
                                <div className="col-8">
                                    <h2 className="d-flex align-items-center mb-0">
                                        {totalUsers}
                                    </h2>
                                </div>
                                <div className="col-4 text-right">
                                    <span>12.5% <i className="fa fa-arrow-up" /></span>
                                </div>
                            </div>
                            <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
                                <div className="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ width: '25%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card l-bg-blue-dark">
                        <div className="card-statistic-3 p-4">
                            <div className="card-icon card-icon-large"><i className="fas fa-users" /></div>
                            <div className="mb-4">
                                <h5 className="card-title mb-0">Người dùng mới hôm nay</h5>
                            </div>
                            <div className="row align-items-center mb-2 d-flex">
                                <div className="col-8">
                                    <h2 className="d-flex align-items-center mb-0">
                                        {todaySignups}
                                    </h2>
                                </div>
                                <div className="col-4 text-right">
                                    <span>{growthRate}% <i className="fa fa-arrow-up" /></span>
                                </div>
                            </div>
                            <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
                                <div className="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ width: '25%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card l-bg-green-dark">
                        <div className="card-statistic-3 p-4">
                            <div className="card-icon card-icon-large"><i className="fas fa-ticket-alt" /></div>
                            <div className="mb-4">
                                <h5 className="card-title mb-0">Số lượt đã làm bài</h5>
                            </div>
                            <div className="row align-items-center mb-2 d-flex">
                                <div className="col-8">
                                    <h2 className="d-flex align-items-center mb-0">
                                        {totalAttempts}
                                    </h2>
                                </div>
                                <div className="col-4 text-right">
                                    <span>10% <i className="fa fa-arrow-up" /></span>
                                </div>
                            </div>
                            <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
                                <div className="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ width: '25%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                    <div className="card l-bg-orange-dark">
                        <div className="card-statistic-3 p-4">
                            <div className="card-icon card-icon-large"><i className="fas fa-dollar-sign" /></div>
                            <div className="mb-4">
                                <h5 className="card-title mb-0">Số lượt làm trong ngày </h5>
                            </div>
                            <div className="row align-items-center mb-2 d-flex">
                                <div className="col-8">
                                    <h2 className="d-flex align-items-center mb-0">
                                        {dailyAttempts}
                                    </h2>
                                </div>
                                <div className="col-4 text-right">
                                    <span>2.5% <i className="fa fa-arrow-up" /></span>
                                </div>
                            </div>
                            <div className="progress mt-1 " data-height={8} style={{ height: 8 }}>
                                <div className="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ width: '25%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: '80%', height: '400px', marginBottom: '60px' }}>
                <h2>Số lượt làm bài theo tháng</h2>
                <Line height={300} // Đặt chiều cao cho biểu đồ
                    width={600} // Đặt chiều rộng cho biểu đồ 
                    data={chartData} />
            </div>
        </div>

    );
};

export default DashBoard;
