import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:8000'; // Replace with your actual backend URL

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<{ analysis_id: string }>(
        `${API_BASE_URL}/api/video/upload/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setAnalysisId(response.data.analysis_id);
      setAnalysisStatus('PENDING');
    } catch (err) {
      setError(`Upload failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const pollResults = async () => {
      if (analysisId && analysisStatus !== 'COMPLETED' && analysisStatus !== 'FAILED') {
        try {
          const response = await axios.get<any>(`${API_BASE_URL}/api/video/result/?id=${analysisId}`);
          setAnalysisStatus(response.data.status);
          setAnalysisResults(response.data); // Store the entire response
          if (response.data.status === 'COMPLETED' || response.data.status === 'FAILED') {
            clearInterval(intervalId);
          }
        } catch (err) {
          setError(`Failed to fetch results: ${err instanceof Error ? err.message : String(err)}`);
          clearInterval(intervalId);
        }
      }
    };

    if (analysisId) {
      intervalId = setInterval(pollResults, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [analysisId, analysisStatus]);

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
        Upload Video
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {analysisStatus && (
        <div className="mt-4">
          <p>Analysis Status: {analysisStatus}</p>
          {analysisResults && (
            <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto max-h-96">
              {JSON.stringify(analysisResults, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;