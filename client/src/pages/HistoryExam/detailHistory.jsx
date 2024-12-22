import React from "react";
import "./styles.css";

const DetailHistory = ({ question, group, part, onNext, onPrev, isLastQuestion }) => {
    if (!group || !part || !question) {
        return <p>Không có dữ liệu để hiển thị.</p>;
    }

    const images =
        part === 3 || part === 4
            ? group?.elements?.filter((el) => el.typeUrl === "image") || []
            : question?.element?.filter((el) => el.typeUrl === "image") || [];

    const audios =
        part === 3 || part === 4
            ? group?.elements?.filter((el) => el.typeUrl === "audio") || []
            : question?.element?.filter((el) => el.typeUrl === "audio") || [];

    const options = question?.options || [];
    const listQuestion = group?.questions || [];

    return (
        <div className="row fixed-form-container">
            <div className="col-md-6">
                <div className="p-3">
                    <p className="fw-bold">Câu hỏi</p>
                    {part !== 2 && images.length > 0 ? (
                        images.map((image) => (
                            <img key={image._id} src={image.url} alt="Question visual" className="fixed-image" />
                        ))
                    ) : (
                        <></>
                    )}
                    {images.length > 0 ? audios.map((audio) => (
                        <div key={audio._id} className="mb-3 mt-3">
                            <audio controls>
                                <source src={audio.url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )) : (<></>)}
                </div>
            </div>
            <div className="col-md-6 border d-flex flex-column" style={{ overflowY: "auto", height: "460px" }}>
                {part === 3 || part === 4 ? (
                    <div className="p-3 flex-grow-1">
                        {listQuestion.map((q, index) => (
                            <div key={q._id || index} className="mb-4">
                                <p className="fw-bold">{`${q.title}`}</p>
                                {q.options.map((option, idx) => {
                                    const isCorrect = option.option === q.correctOption;
                                    const isSelected = option.option === q.selectedOption;
                                    let optionClass = "form-check-label";

                                    if (isCorrect) {
                                        optionClass += " correct-option";
                                    }
                                    if (isSelected) {
                                        if (isCorrect) {
                                            optionClass += " selected-correct";
                                        } else {
                                            optionClass += " selected-incorrect";
                                        }
                                    }

                                    return (
                                        <div className="form-check" style={{ paddingLeft: "0" }} key={idx}>
                                            <label className={optionClass} htmlFor={`option-${idx}`}>
                                                {`${option.option}. ${option.text}`}
                                            </label>
                                        </div>
                                    );
                                })}
                                {/* Thẻ đánh dấu nếu chưa chọn câu trả lời */}
                                {!q.selectedOption && (
                                    <p className="text-danger" style={{ fontStyle: "italic" }}>
                                        Chưa chọn câu trả lời
                                    </p>
                                )}
                            </div>
                        ))}

                    </div>
                ) : (
                    <div className="p-3 flex-grow-1">
                        <p className="fw-bold">{question.text}</p>
                        {options
                            .slice(0, part === 2 ? options.length - 1 : options.length)
                            .map((option, index) => {
                                const isCorrect = option.option === question.correctOption;
                                const isSelected = option.option === question.selectedOption;
                                let optionClass = "form-check-label";

                                if (isCorrect) {
                                    optionClass += " correct-option";
                                }
                                if (isSelected) {
                                    if (isCorrect) {
                                        optionClass += " selected-correct";
                                    } else {
                                        optionClass += " selected-incorrect";
                                    }
                                }

                                return (
                                    <div className="form-check" style={{ paddingLeft: "0" }} key={index}>
                                        <label className={optionClass} htmlFor={`option-${index}`}>
                                            {`${option.option}. ${option.text}`}
                                        </label>
                                    </div>
                                );
                            })}
                        {/* Thẻ đánh dấu nếu chưa chọn câu trả lời */}
                        {!question.selectedOption && (
                            <p className="text-danger" style={{ fontStyle: "italic" }}>
                                Chưa chọn câu trả lời
                            </p>
                        )}

                    </div>
                )}
                <div className="mt-3 mb-3 text-end" style={{ position: "absolute", bottom: "25px", right: "40px" }}>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        style={{ marginRight: "8px" }}
                        onClick={onPrev}
                    >
                        Quay lại
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onNext}
                        disabled={isLastQuestion}
                        style={{
                            backgroundColor: isLastQuestion ? "#ccc" : "#007bff",
                            color: isLastQuestion ? "#666" : "#fff",
                            borderColor: isLastQuestion ? "#bbb" : "#007bff",
                            cursor: isLastQuestion ? "not-allowed" : "pointer",
                            opacity: isLastQuestion ? 0.7 : 1,
                        }}
                    >
                        Tiếp theo
                    </button>
                </div>
            </div>
        </div>
    );
};


export default DetailHistory;
