import React from 'react';
import '../styles/index.css';
import '../styles/popup.css';
import Select from 'react-select';
import { useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// Get Pinata credentials from environment variables
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY;

const ApplicationSubmit = () => {
  const options = [
    {value: '0', label: "earthquake"},
    {value: '1', label: "volcano"},
    {value: '2', label: "flood"},
    {value: '3', label: "hurricane"},
    {value: '4', label: "tornado"},
    {value: '5', label: "tsunami"},]

  // Form data structure
  const [formData, setFormData] = useState({
    disaster: null,
    title: '',
    amount: '',
    description: '',
    previewFile: null,
    evidenceFile: null,
    previewIpfsHash: '',
    evidenceIpfsHash: '',
    previewUploadStatus: '',
    evidenceUploadStatus: '',
    gasFee: "0.01",
    voteEndDate: "2025/12/12 12:12:12 pm",
    applicantAddress: "xxxxxx123xxxxxxx",
    submissionDate: new Date().toISOString(),
    status: 'pending'
  });

  const updateFormData = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const logging = () => {
    console.log('Form Data:', {
      disaster: formData.disaster,
      title: formData.title,
      amount: parseFloat(formData.amount),
      description: formData.description,
      previewIpfsHash: formData.previewIpfsHash,
      evidenceIpfsHash: formData.evidenceIpfsHash,
      gasFee: formData.gasFee,
      voteEndDate: formData.voteEndDate,
      applicantAddress: formData.applicantAddress,
      submissionDate: formData.submissionDate,
      status: formData.status
    });
  };

  const onPreviewFileChange = (event) => {
    const file = event.target.files[0];
    updateFormData('previewFile', file);
    updateFormData('previewUploadStatus', '');
    updateFormData('previewIpfsHash', '');
  };

  const onEvidenceFileChange = (event) => {
    const file = event.target.files[0];
    updateFormData('evidenceFile', file);
    updateFormData('evidenceUploadStatus', '');
    updateFormData('evidenceIpfsHash', '');
  };

  const uploadToIPFS = async (file, setIpfsHash, setUploadStatus) => {
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }

    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      setUploadStatus('Error: Pinata API credentials not found. Please check your .env file.');
      console.error('Pinata credentials missing:', {
        apiKey: PINATA_API_KEY ? 'Present' : 'Missing',
        secretKey: PINATA_SECRET_KEY ? 'Present' : 'Missing'
      });
      return;
    }

    try {
      setUploadStatus('Uploading to IPFS...');
      
      const formData = new FormData();
      formData.append('file', file);

      console.log('Attempting to upload to Pinata...');
      
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_KEY
          }
        }
      );

      const ipfsHash = response.data.IpfsHash;
      setIpfsHash(ipfsHash);
      setUploadStatus('Upload successful!');
      
      console.log('IPFS Hash:', ipfsHash);
      console.log('View file at:', `https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
    } catch (error) {
      console.error('Error uploading to IPFS:', error.response?.data || error.message);
      setUploadStatus(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  };

  const onPreviewUpload = () => {
    uploadToIPFS(
      formData.previewFile, 
      (hash) => updateFormData('previewIpfsHash', hash),
      (status) => updateFormData('previewUploadStatus', status)
    );
  };

  const onEvidenceUpload = () => {
    uploadToIPFS(
      formData.evidenceFile,
      (hash) => updateFormData('evidenceIpfsHash', hash),
      (status) => updateFormData('evidenceUploadStatus', status)
    );
  };

  const fileData = (file, ipfsHash, uploadStatus) => {
    if (file) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {file.name}</p>
          <p>File Type: {file.type}</p>
          {ipfsHash && (
            <div>
              <p>IPFS Hash (CID): {ipfsHash}</p>
              <p>View on IPFS: <a href={`https://ipfs.io/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">View File</a></p>
            </div>
          )}
          {uploadStatus && <p>Status: {uploadStatus}</p>}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  const PreviewMedia = ({ file, ipfsHash }) => {
    if (!file) return null;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const previewUrl = ipfsHash 
      ? `https://ipfs.io/ipfs/${ipfsHash}`
      : URL.createObjectURL(file);

    if (isImage) {
      return (
        <div className="preview-container">
          <img 
            src={previewUrl} 
            alt="Preview" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '200px', 
              objectFit: 'contain',
              margin: '10px 0',
              borderRadius: '4px'
            }} 
          />
        </div>
      );
    } else if (isVideo) {
      return (
        <div className="preview-container">
          <video 
            controls
            style={{ 
              maxWidth: '100%', 
              maxHeight: '200px', 
              objectFit: 'contain',
              margin: '10px 0',
              borderRadius: '4px'
            }}
          >
            <source src={previewUrl} type={file.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    return null;
  };

  const validateForm = () => {
    const missingFields = [];
    
    if (!formData.disaster) missingFields.push('Disaster Type');
    if (!formData.title) missingFields.push('Title');
    if (!formData.amount) missingFields.push('Amount');
    if (!formData.description) missingFields.push('Description');
    if (!formData.previewFile) missingFields.push('Preview Image/Video');
    if (!formData.evidenceFile) missingFields.push('Evidence');
    
    return missingFields;
  };

  const handleSubmit = () => {
    const missingFields = validateForm();
    if (missingFields.length > 0) {
      return false;
    }
    return true;
  };

  return (
    <div className="text-white p-6 space-y-6">
      <div className="space-y-2">
        <label className="text-white block">災害: 
          <Select 
            options={options}
            value={formData.disaster}
            onChange={(disaster) => updateFormData('disaster', disaster)}
            type="text"
            className="text-black mt-1 w-full"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-white block">
          請款名稱: 
          <input
            value={formData.title}
            onChange={e => updateFormData('title', e.target.value)}
            type="text"
            className="text-black bg-white mt-1 w-full p-2 rounded"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-white block">
          請款金額: 
          <input
            value={formData.amount}
            onChange={e => updateFormData('amount', e.target.value)}
            type="number"
            className="text-black bg-white mt-1 w-full p-2 rounded"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-white block">
          說明文字: 
          <input
            value={formData.description}
            onChange={e => updateFormData('description', e.target.value)}
            type="text"
            className="text-black bg-white mt-1 w-full p-2 rounded"
          />
        </label>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <input type="file" onChange={onPreviewFileChange} className="text-white" />
          <button onClick={onPreviewUpload} className="bg-[#8c6dfd] text-white px-4 py-2 rounded-lg">Upload Preview Image/Video</button>
          <div className="text-white">
            {fileData(formData.previewFile, formData.previewIpfsHash, formData.previewUploadStatus)}
          </div>
        </div>

        <div className="space-y-2">
          <input type="file" onChange={onEvidenceFileChange} className="text-white" />
          <button onClick={onEvidenceUpload} className="bg-[#8c6dfd] text-white px-4 py-2 rounded-lg">Upload Evidence</button>
          <div className="text-white">
            {fileData(formData.evidenceFile, formData.evidenceIpfsHash, formData.evidenceUploadStatus)}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Popup
          trigger={<button className="button bg-[#8c6dfd] text-white px-4 py-2 rounded-lg"> Submit </button>}
          modal
          nested
        >
          {close => {
            const missingFields = validateForm();
            if (missingFields.length > 0) {
              return (
                <div className="modal warning-modal bg-[#1c1c24] text-white">
                  <div className="content">
                    <h2>Missing Information</h2>
                    <p>Please fill in all required fields:</p>
                    <ul>
                      {missingFields.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>
                    <div className="actions">
                      <button
                        className="button bg-[#8c6dfd] text-white px-4 py-2 rounded-lg"
                        onClick={close}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div className="modal bg-[#1c1c24] text-white">
                <div className="content">
                  <h2>Submit Confirmation</h2>
                  <p>Are you sure you want to submit this form?</p>
                  <br />
                  <p>Disaster : {formData.disaster.label} Title : {formData.title}</p>
                  <br />
                  <div className="preview-section">
                    <h3>Preview Image/Video:</h3>
                    <PreviewMedia file={formData.previewFile} ipfsHash={formData.previewIpfsHash} />
                    <p>Preview Link: {formData.previewIpfsHash ? 
                      <a href={`https://ipfs.io/ipfs/${formData.previewIpfsHash}`} target="_blank" rel="noopener noreferrer" className="text-[#8c6dfd]">
                        View on IPFS
                      </a> 
                      : 'No preview uploaded'}
                    </p>
                  </div>
                  <br />
                  <p>Amount : {formData.amount} Gas Fee : {formData.gasFee}</p>
                  <br />
                  <p>Voting End Date: {formData.voteEndDate} Applicant Address : {formData.applicantAddress}</p>
                  <br />
                  <div className="actions">
                    <button
                      className="button bg-[#8c6dfd] text-white px-4 py-2 rounded-lg"
                      onClick={() => {
                        logging();
                        close();
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="button bg-[#8c6dfd] text-white px-4 py-2 rounded-lg"
                      onClick={close}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          }}
        </Popup>
      </div>
    </div>
  )
}

export default ApplicationSubmit;
