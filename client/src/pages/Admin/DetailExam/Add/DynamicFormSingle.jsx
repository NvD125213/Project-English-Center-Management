import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { uploadFilesToFirebase } from '../../../../helpers/uploadFile';
import api from '../../../../services/instance';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const { Option } = Select;

const DynamicFormSingle = ({ examId, part, onQuestionsAdded }) => {
  const [forms, setForms] = useState([{ id: 1, audio: '', image: '', text: '', descriptions: '', choices: ['', '', '', ''], correctChoice: '' }]);
  const [loading, setLoading] = useState(false);

  const addForm = () => {
    setForms((prevForms) => [
      ...prevForms,
      { id: prevForms.length + 1, audio: '', image: '', text: '', descriptions: '', choices: ['', '', '', ''], correctChoice: '' },
    ]);
  };

  const removeForm = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  const handleChange = (index, field, value, choiceIndex = null) => {
    setForms((prevForms) =>
      prevForms.map((form, formIndex) =>
        formIndex === index
          ? {
            ...form,
            [field]: choiceIndex !== null
              ? form.choices.map((choice, i) => (i === choiceIndex ? value : choice))
              : value,
          }
          : form
      )
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const uploadProgress = [];
      const uploadCallback = (progress) => {
        uploadProgress.push(progress);
        console.log(`Progress: ${progress}%`);
      };

      const uploadPromises = forms.map(async (form) => {
        const { audio, image, text, choices, correctChoice } = form;

        const audioURLs = audio ? await uploadFilesToFirebase([audio], 'Audio', uploadCallback) : Promise.resolve([]);
        const imageURLs = image ? await uploadFilesToFirebase([image], 'Image', uploadCallback) : Promise.resolve([]);

        const options = choices.map((choice, i) => ({
          option: ['A', 'B', 'C', 'D'][i],
          text: choice,
        }));


        return {
          title: text,
          element: [{ typeUrl: 'audio', url: audioURLs[0] || '' }, { typeUrl: 'image', url: imageURLs[0] || '' }],
          options,
          correctOption: correctChoice,
        };
      });

      const formWithUpload = await Promise.all(uploadPromises);
      const response = await api.post(`/question/create?idExam=${examId}&part=${part}`, { questions: formWithUpload });
      onQuestionsAdded(response.data.message);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm câu hỏi.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {forms.map((form, index) => (
        <div key={form.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h4>Câu hỏi {index + 1}</h4>

          {part !== '5' && (
            <Form.Item label="Audio">
              <Input type="file" accept="audio/*" onChange={(e) => handleChange(index, 'audio', e.target.files[0])} />
            </Form.Item>
          )}

          {part !== '2' && part !== '5' && (
            <Form.Item label="Image">
              <Input type="file" accept="image/*" onChange={(e) => handleChange(index, 'image', e.target.files[0])} />
            </Form.Item>
          )}

          <Form.Item label="Text">
            <Input.TextArea value={form.text} onChange={(e) => handleChange(index, 'text', e.target.value)} />
          </Form.Item>

          {['A', 'B', 'C', 'D'].map((label, choiceIndex) => {
            if (part === '2' && label === 'D') {
              return null;
            }

            return (
              <Form.Item key={choiceIndex} label={`Choice ${label}`}>
                <Input
                  value={form.choices[choiceIndex]}
                  onChange={(e) => handleChange(index, 'choices', e.target.value, choiceIndex)}
                />
              </Form.Item>
            );
          })}

          <Form.Item label="Lựa chọn đúng">
            <Select
              value={form.correctChoice}
              onChange={(value) => handleChange(index, 'correctChoice', value)}
              placeholder="Chọn đáp án đúng"
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              {part !== '2' && <Option value="D">D</Option>}
            </Select>
          </Form.Item>

          <Button type="danger" onClick={() => removeForm(form.id)} style={{ marginTop: '10px' }}>
            Xóa câu hỏi
          </Button>
        </div>
      ))}
      <Button type="dashed" onClick={addForm} style={{ width: '100%', marginBottom: '20px' }} disabled={loading}>
        + Thêm câu hỏi
      </Button>

      <Button type="primary" onClick={handleSubmit} disabled={loading}>
        {loading ? <LoadingSpinner /> : 'Lưu câu hỏi'}
      </Button>
    </div>
  );
};

export default DynamicFormSingle;
