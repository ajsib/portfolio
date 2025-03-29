import React, { useEffect, useState } from 'react';

interface CreateLetterProps {
    onCancel: () => void;
    onSuccess: (datestamp: string) => void;
  }

const CreateLetter = ({ onCancel, onSuccess }: CreateLetterProps) => {
    const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [author, setAuthor] = useState<string | null>(null);

  const recipient = author === 'Aidan' ? 'Clothilde' : 'Aidan';

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setAuthor(stored);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!author) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);

    images.forEach((img) => formData.append('images', img));

    const res = await fetch('/api/letters/create', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (res.ok) {
      onSuccess(data.datestamp);
    } else {
      alert(data.error || 'Something went wrong!');
    }
  };

  return (
    <div className="letter-form">
      <h2 className="letter-heading">Create a Love Letter</h2>

      <div className="form-group">
        <div className="label">Title</div>
        <input
          type="text"
          className="letter-input"
          placeholder="My dearest..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="label">Letter Content</div>
        <textarea
          className="letter-textarea"
          placeholder="Write something heartfelt..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="fromto">
        <span>From: {author}</span>
        <span>To: {recipient}</span>
      </div>

      <div className="form-group">
        <div className="label">Choose Images</div>
        <label className="custom-file-upload">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <span className="file-button">📷 Choose Photos</span>
        </label>

        {images.length > 0 && (
          <div className="preview">
            {images.map((img, i) => (
              <div key={i} className="thumb">
                <img src={URL.createObjectURL(img)} alt={`preview ${i}`} />
                <button type="button" onClick={() => removeImage(i)} className="remove-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="none"
                    width="16"
                    height="16"
                  >
                    <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                    <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="actions">
        <button className="send-button" onClick={handleSubmit} disabled={uploading}>
          {uploading ? 'Sending...' : '💌 Send Letter'}
        </button>
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
      </div>

      <style jsx>{`
        .letter-form {
          background: linear-gradient(145deg, #ffffff, #fdf4f4);
          border: 1px solid #e8d4d4;
          border-radius: 16px;
          padding: 1.5rem;
          max-width: 600px;
          width: 100%;
          box-shadow: 
            0 2px 10px rgba(0,0,0,0.04),
            0 0 30px rgba(255, 200, 200, 0.05) inset;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          font-family: 'Segoe UI', 'Helvetica', sans-serif;
          background-image: 
            linear-gradient(to right, rgba(220, 200, 200, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 200, 200, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          position: relative;
          overflow: hidden;
        }

        .letter-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(to right, #f8c9c9, #f3d7d7, #f8c9c9);
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
        }

        .letter-heading {
          font-family: 'Georgia', 'Times New Roman', serif;
          text-align: center;
          color: #775555;
          font-size: 1.8rem;
          margin: 0.5rem 0 1rem;
          font-weight: normal;
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
          position: relative;
        }

        .letter-heading::after {
          content: '';
          display: block;
          width: 80px;
          height: 2px;
          background: linear-gradient(to right, transparent, #ecc6c6, transparent);
          margin: 0.5rem auto 0;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .label {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
          color: #775555;
          letter-spacing: 0.02em;
        }

        .letter-input,
        .letter-textarea {
        
          padding: 0.75rem;
          border-radius: 12px;
          border: 1px solid #e8d4d4;
          background-color: rgba(255, 255, 255, 0.7);
          font-family: 'Segoe UI', 'Helvetica', sans-serif;
          font-size: 1rem;
          width: 100%;
          box-shadow: 
            0 1px 3px rgba(0,0,0,0.02) inset,
            0 0 0 4px rgba(232, 212, 212, 0.1);
          transition: all 0.2s ease;
        }

        .letter-input:focus,
        .letter-textarea:focus {
          outline: none;
          border-color: #ddbaba;
          background-color: white;
          box-shadow: 0 0 0 4px rgba(232, 212, 212, 0.15);
        }

        .letter-textarea {
          min-height: 180px;
          resize: vertical;
          line-height: 1.5;
          background-image: linear-gradient(transparent, transparent calc(1.5em - 1px), #e8d4d4 0);
          background-size: 100% 1.5em;
          background-position-y: 1px;
        }

        .fromto {
          display: flex;
          justify-content: space-between;
          font-style: italic;
          font-size: 0.9rem;
          color: #886868;
          padding: 0 0.25rem;
        }

        .custom-file-upload {
          display: block;
          position: relative;
          cursor: pointer;
        }

        .custom-file-upload input[type="file"] {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }

        .file-button {
          display: inline-block;
          padding: 0.6rem 1.2rem;
          background: linear-gradient(145deg, #f9eded, #f7e2e2);
          border: 1px solid #e8d4d4;
          border-radius: 12px;
          color: #886868;
          font-size: 0.95rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s ease;
          text-align: center;
          margin-top: 0.25rem;
          position: relative;
        }

        .file-button:hover {
          background: linear-gradient(145deg, #f7e2e2, #f9eded);
          color: #775555;
        }

        .file-button:active {
          transform: translateY(1px);
          box-shadow: 0 0 2px rgba(0,0,0,0.05);
        }

        .preview {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .thumb {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          border: 2px solid white;
        }

        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-btn {
          position: absolute;
          top: -6px;
          right: 2px;
          background: white;
          border: none;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          padding: 0;
          color: #cc6666;
        }

        .remove-btn:hover {
          background: #ffeaea;
        }

        .actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .send-button,
        .cancel-button {
          padding: 0.75rem 1.5rem;
          font-weight: bold;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .send-button {
          background: linear-gradient(145deg, #e48d8d, #d67979);
          color: white;
          box-shadow: 
            0 2px 8px rgba(214, 121, 121, 0.3),
            0 0 0 1px rgba(214, 121, 121, 0.1);
        }

        .send-button:hover {
          background: linear-gradient(145deg, #d67979, #e48d8d);
          transform: translateY(-1px);
          box-shadow: 
            0 4px 10px rgba(214, 121, 121, 0.4),
            0 0 0 1px rgba(214, 121, 121, 0.1);
        }

        .send-button:active {
          transform: translateY(1px);
          box-shadow: 
            0 1px 4px rgba(214, 121, 121, 0.3),
            0 0 0 1px rgba(214, 121, 121, 0.1);
        }

        .cancel-button {
          background: linear-gradient(145deg, #f1f1f1, #e8e8e8);
          color: #775555;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .cancel-button:hover {
          background: linear-gradient(145deg, #e8e8e8, #f1f1f1);
        }

        .cancel-button:active {
          transform: translateY(1px);
          box-shadow: none;
        }

        /* Mobile-first responsive adjustments */
        @media (max-width: 480px) {
          .letter-form {
            padding: 1.25rem;
            border-radius: 12px;
            gap: 1rem;
          }

          .letter-heading {
            font-size: 1.5rem;
          }

          .actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .send-button, 
          .cancel-button {
            width: 100%;
            padding: 0.8rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateLetter;