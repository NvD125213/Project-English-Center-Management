const QuestionDetail = ({ question, allQuestions, group, part, onNext, onPrev, onSelectAnswer, answers, isLastQuestion }) => {
    const images = part === 3 || part === 4
        ? group.elements?.filter((el) => el.typeUrl === "image") || []
        : question.element?.filter((el) => el.typeUrl === "image") || [];

    const audios = part === 3 || part === 4
        ? group.elements?.filter((el) => el.typeUrl === "audio") || []
        : question.element?.filter((el) => el.typeUrl === "audio") || [];

    const options = question.options || [];
    const listQuestion = group.questions;

    let globalIndex = 0;


    return (
        <div className="row fixed-form-container">
            <div className="col-md-6">
                <div className="p-3">
                    <p className="fw-bold"></p>
                    {part !== 2 && images.length > 0 ? (
                        images.map((image) => (
                            <img key={image._id} src={image.url} alt="Hình ảnh câu hỏi" className="fixed-image" />
                        ))
                    ) : (
                        <></>
                    )}
                    {images.length > 0 ? audios.map((audio) => (
                        <div key={audio._id} className="mb-3 mt-3">
                            <audio controls>
                                <source src={audio.url} type="audio/mpeg" />
                                Trình duyệt của bạn không hỗ trợ phần tử âm thanh.
                            </audio>
                        </div>
                    )) : (<></>)}
                </div>
            </div>

            <div className="col-md-6 border d-flex flex-column" style={{ overflowY: 'auto', height: '460px' }}>
                {part === 3 || part === 4 ? (
                    <div className="p-3 flex-grow-1">
                        {listQuestion.map((q, index) => {
                            return (
                                <div key={q._id || index} className="mb-4">
                                    <p className="fw-bold">{`${q.title}`}</p>  {/* Hiển thị globalIndex */}
                                    {q.options.map((option, idx) => (
                                        <div className="form-check" key={option._id || idx}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`answer-${index}`}
                                                id={`option-${index}-${idx}`}
                                                onChange={() => onSelectAnswer(group._id, q._id, option.option)}
                                                checked={answers[group._id]?.selectedAnswers[q._id] === option.option}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`option-${index}-${idx}`}
                                            >
                                                {`${option.option}. ${option.text}`}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-3 flex-grow-1">
                        <p className="fw-bold"></p>  {/* Hiển thị globalIndex */}
                        {options
                            .slice(0, part === 2 ? options.length - 1 : options.length)
                            .map((option, index) => (
                                <div className="form-check" key={option._id || index}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="answer"
                                        id={`option${index}`}
                                        onChange={() => onSelectAnswer(group._id, question._id, option.option)}
                                        checked={answers[group._id]?.selectedAnswers[question._id] === option.option}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`option${index}`}
                                    >
                                        {`${option.option}. ${option.text}`}
                                    </label>
                                </div>
                            ))}
                    </div>
                )}

                <div className="mt-3 mb-3 text-end" style={{ position: 'absolute', bottom: '25px', right: '40px' }}>
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

export default QuestionDetail;
