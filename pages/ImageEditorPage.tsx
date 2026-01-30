import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SparklesIcon, PhotoIcon, ArrowPathIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

const MODEL_NAME = 'gemini-2.5-flash-image';

// --- Helper Functions ---
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

const ImageEditorPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setOriginalImage(file);
      setOriginalImageUrl(URL.createObjectURL(file));
      setGeneratedImage(null); // Clear previous result
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] },
    multiple: false,
  });

  const handleGenerate = async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and provide a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const imagePart = await fileToGenerativePart(originalImage);

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: {
          parts: [
            imagePart,
            { text: prompt },
          ],
        },
      });
      
      const firstCandidate = response.candidates?.[0];
      if (firstCandidate) {
        // Find the image part in the response
        const imagePart = firstCandidate.content.parts.find(part => part.inlineData);
        if (imagePart?.inlineData) {
           const base64String = imagePart.inlineData.data;
           const mimeType = imagePart.inlineData.mimeType;
           setGeneratedImage(`data:${mimeType};base64,${base64String}`);
        } else {
            setError('The AI did not return an image. Please try a different prompt.');
        }
      } else {
        setError('No valid response from the AI. The request might have been blocked.');
      }
    } catch (e: any) {
      console.error(e);
      setError(`An error occurred: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
      setOriginalImage(null);
      setOriginalImageUrl(null);
      setGeneratedImage(null);
      setPrompt('');
      setError(null);
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
             <SparklesIcon className="h-8 w-8 text-purple-500"/>
             <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-primary-500 tracking-tight">
               AI Image Editor
             </h1>
          </div>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Powered by Gemini 2.5 Flash Image. Upload a photo, describe your changes, and let the AI bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Controls & Input */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sticky top-24">
            <div className="space-y-6">
              {/* Step 1: Upload Image */}
              <div>
                <label className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                   <span className="bg-primary-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-mono">1</span>
                   Upload Your Image
                </label>
                <div 
                  {...getRootProps()}
                  className={`mt-4 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 bg-white dark:bg-gray-700'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <PhotoIcon className="h-12 w-12 text-gray-400 mb-2"/>
                    {isDragActive ? (
                      <p className="text-primary-600 font-semibold">Drop the image here...</p>
                    ) : (
                      <>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">Drag & drop an image, or click to select</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Enter Prompt */}
              <div>
                <label htmlFor="prompt" className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                   <span className="bg-primary-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-mono">2</span>
                   Describe Your Edit
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'Add a retro filter', 'Change the background to a beach', 'Make it look like a watercolor painting'"
                  className="mt-4 w-full p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  disabled={!originalImage}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
               <button
                 onClick={handleGenerate}
                 disabled={!originalImage || !prompt || isLoading}
                 className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed group"
               >
                 {isLoading ? (
                    <>
                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     <span>Generating...</span>
                    </>
                 ) : (
                    <>
                     <CpuChipIcon className="h-6 w-6 transition-transform group-hover:scale-110"/>
                     <span>Generate Image</span>
                    </>
                 )}
               </button>
               <button 
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                 <ArrowPathIcon className="h-5 w-5"/>
                 Reset
               </button>
            </div>
            {error && <p className="mt-4 text-sm text-center text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}
          </div>

          {/* Image Display */}
          <div className="grid grid-cols-1 gap-8">
            {/* Original Image */}
            <div className="space-y-2">
               <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Original</h3>
               <div className="aspect-square w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                {originalImageUrl ? (
                    <img src={originalImageUrl} alt="Original upload" className="w-full h-full object-contain" />
                ) : (
                    <div className="text-gray-400">Your image will appear here</div>
                )}
               </div>
            </div>
            
            {/* Generated Image */}
            <div className="space-y-2">
               <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">AI Generated</h3>
               <div className="relative aspect-square w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 shimmer-bg"></div>
                )}
                {generatedImage ? (
                    <img src={generatedImage} alt="AI generated result" className="w-full h-full object-contain animate-fade-in" />
                ) : !isLoading && (
                    <div className="text-gray-400">Your edited image will appear here</div>
                )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorPage;