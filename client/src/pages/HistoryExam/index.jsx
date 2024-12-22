import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDetailHistory } from "../../store/historySlice";
import DetailHistory from "./detailHistory";
import Footer from "../../components/Footer";
import HeaderHistory from "./header";

const DetailHistoryExam = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user);
    const { groups = [], loading, error } = useSelector((state) => state.history);
    const { historyId, examId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && user._id) {
            dispatch(fetchDetailHistory({ userId: user._id, examId, historyId }));
        }
    }, [user, examId, historyId, dispatch]);

    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const currentPart = groups?.[currentPartIndex]?.questions || [];
    const currentQuestion = currentPart?.[currentQuestionIndex];
    const isLastQuestion = groups?.length > 0 && currentPartIndex === groups.length - 1;

    const handleNext = () => {
        if (currentQuestionIndex < currentPart.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else if (currentPartIndex < groups.length - 1) {
            setCurrentPartIndex((prevIndex) => prevIndex + 1);
            setCurrentQuestionIndex(0);
        } else {
            alert("Bạn đã hoàn thành tất cả các câu hỏi!");
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        } else if (currentPartIndex > 0) {
            const prevPartIndex = currentPartIndex - 1;
            const prevPartQuestions = groups[prevPartIndex]?.questions || [];
            setCurrentPartIndex(prevPartIndex);
            setCurrentQuestionIndex(prevPartQuestions.length - 1);
        } else {
            alert("Đây là câu hỏi đầu tiên!");
        }
    };

    const navigateHomeInHistory = () => {
        navigate('/')
    }

    return (
        <section>
            <HeaderHistory
                navigateHomepage={navigateHomeInHistory}
                groups={groups}
                onQuestionSelect={(partIndex, questionIndex) => {
                    setCurrentPartIndex(partIndex);
                    setCurrentQuestionIndex(questionIndex);
                }}
            />
            <div className="container mt-4 mb-4">
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <p className="text-danger">Lỗi: {error}</p>
                ) : groups.length > 0 ? (
                    <DetailHistory
                        question={currentQuestion}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        group={groups[currentPartIndex] || {}}
                        part={groups[currentPartIndex]?.part}
                        isLastQuestion={isLastQuestion}
                    />
                ) : (
                    <p>Không có dữ liệu để hiển thị.</p>
                )}
            </div>
            <Footer />
        </section>
    );
};

export default DetailHistoryExam;
