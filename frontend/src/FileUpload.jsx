import { useState } from 'react';

function FileUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Image uploaded successfully');
                setPreview(result.imageUrl); // Display uploaded image's URL as a preview
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading image');
        }
    };

    return (
        <div className="file-upload" style={styles.uploadContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.uploadBox}>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        style={styles.fileInput} 
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" style={styles.label}>
                        <div style={styles.uploadIcon}></div>
                        <span style={styles.uploadText}>Choose files to Upload</span>
                        <p style={styles.dragText}>or drag and drop them here</p>
                    </label>
                </div>
                <button type="submit" style={styles.submitButton}>Upload</button>
            </form>

            {preview && (
                <div className="preview" style={styles.preview}>
                    <h3 style={styles.previewTitle}>Image Preview:</h3>
                    <img src={preview} alt="Preview" style={styles.previewImage} />
                </div>
            )}
        </div>
    );
}

const styles = {
    uploadContainer: {
        border: '2px dashed #ccc',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        width: '400px',
        margin: '0 auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    uploadBox: {
        position: 'relative',
        width: '100%',
        height: '150px',
        backgroundColor: '#f8f8f8',
        borderRadius: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ccc',
    },
    fileInput: {
        opacity: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadIcon: {
        width: '50px',
        height: '50px',
        backgroundColor: '#6c9ded',
        borderRadius: '50%',
        marginBottom: '10px',
        backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDRMNy41IDhIMTlMMTQuNSAxMkgxMnY0SDhWMTRaTTIgMThWMTZIMThWMThIMiIgc3Ryb2tlPSIjRjAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==)', // Base64 for an upload icon
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    uploadText: {
        color: '#4CAF50',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    dragText: {
        color: '#888',
        fontSize: '14px',
    },
    submitButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    preview: {
        marginTop: '20px',
    },
    previewTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    previewImage: {
        width: '300px',
        borderRadius: '10px',
    },
};

export default FileUpload;
