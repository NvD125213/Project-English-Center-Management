import React from "react";

const CHTG = () => {
    const faqItems = [
        {
            id: 1,
            question: "TOEIC là gì?",
            answer: "TOEIC (Test of English for International Communication) là kỳ thi đánh giá khả năng sử dụng tiếng Anh trong môi trường làm việc quốc tế."
        },
        {
            id: 2,
            question: "Tôi có thể tự học TOEIC được không?",
            answer: "Có thể! Tự học TOEIC đòi hỏi bạn cần có kế hoạch học tập rõ ràng, tài liệu phù hợp và sự kiên trì."
        },
        {
            id: 3,
            question: "TOEIC có giao tiếp được không?",
            answer: "TOEIC chủ yếu đánh giá kỹ năng nghe và đọc. Nếu muốn giao tiếp tốt, bạn cần bổ sung thêm kỹ năng nói và viết."
        },
        {
            id: 4,
            question: "Chứng chỉ TOEIC có được công nhận không?",
            answer: "Chứng chỉ TOEIC được công nhận rộng rãi trên toàn thế giới, đặc biệt trong môi trường làm việc quốc tế."
        },
        {
            id: 5,
            question: "Học TOEIC có khó không?",
            answer: "Học TOEIC không khó nếu bạn có kế hoạch học tập tốt và luyện tập đều đặn."
        },
        {
            id: 6,
            question: "Nên chọn TOEIC hay IELTS?",
            answer: "Học TOEIC không khó nếu bạn có kế hoạch học tập tốt và luyện tập đều đặn."
        },
        {
            id: 7,
            question: "Chi phí khi học TOEIC?",
            answer: "Học TOEIC không khó nếu bạn có kế hoạch học tập tốt và luyện tập đều đặn."
        }
    ];

    return (
        <div className="container-fluid" style={{ backgroundColor: 'rgb(242, 242, 242)' }}>
            <div className="container my-5" style={{ textAlign: 'left', maxWidth: '50%' }}>
                <h2 className="mb-4">Câu hỏi thường gặp</h2>
                <div className="row">
                    <div className="accordion" id="faqAccordion">
                        {faqItems.map((item) => (
                            <div className="accordion-item" key={item.id}>
                                <h2 className="accordion-header" id={`heading${item.id}`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${item.id}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${item.id}`}
                                    >
                                        {item.question}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${item.id}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${item.id}`}
                                    data-bs-parent="#faqAccordion"
                                >
                                    <div className="accordion-body">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default CHTG;
