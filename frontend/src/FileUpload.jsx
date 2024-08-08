// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

function FileUpload() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
      setPreviewUrl(null); // Clear preview after upload
    } catch (err) {
      console.error(err);
      alert('Failed to upload image');
    }
  };

  return (
    <div className="upload-container">
      <div 
        className="upload-area" 
        onDragOver={handleDragOver} 
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="image-preview" />
        ) : (
          <>
            <div className="upload-icon">
              <img src="path/to/cloud-upload-icon.png" alt="Upload" />
            </div>
            <div className="upload-instructions">
              Drag & Drop files here
            </div>
            <div>or</div>
            <input 
              type="file" 
              id="fileInput" 
              onChange={handleImageChange} 
              style={{ display: 'none' }}
            />
            <label htmlFor="fileInput" className="browse-button">
              Browse Files
            </label>
          </>
        )}
      </div>
      {image && (
        <button onClick={handleSubmit} className="upload-submit">
          Upload
        </button>
      )}
    </div>
  );
}

export default FileUpload;