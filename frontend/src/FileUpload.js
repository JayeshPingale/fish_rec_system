// FileUpload.js
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './FileUpload.css';

const FileUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  const onImageLoaded = (image) => {
    setCompletedCrop(image);
  };

  const onCropComplete = (crop) => {
    setCompletedCrop(crop);
    makeClientCrop(crop);
  };

  const makeClientCrop = (crop) => {
    if (completedCrop && crop.width && crop.height) {
      const canvas = document.createElement('canvas');
      const scaleX = completedCrop.naturalWidth / completedCrop.width;
      const scaleY = completedCrop.naturalHeight / completedCrop.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        completedCrop,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL('image/jpeg');
      setCroppedImageUrl(base64Image);
    }
  };

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <img src="https://testersdock.b-cdn.net/wp-content/uploads/2017/09/file-upload.png" alt="Upload" className="upload-icon" />
          <p>Drag & Drop files here</p>
          <p>or</p>
          <button className="browse-button">Browse Files</button>
        </div>
      )}
      {selectedImage && (
        <ReactCrop
          src={selectedImage}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={(newCrop) => setCrop(newCrop)}
        />
      )}
      {croppedImageUrl && (
        <div className="image-preview">
          <img src={croppedImageUrl} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
