import { useState, useRef, ChangeEvent } from 'react';
import { PRINTING_CONFIG } from '../../config';

interface ModelUploaderProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

const ModelUploader = ({ 
  onUpload, 
  isLoading = false, 
  error,
  className = '' 
}: ModelUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };
  
  const validateAndUpload = (file: File) => {
    // Check file size
    if (file.size > PRINTING_CONFIG.maxFileSize) {
      alert(`O arquivo é muito grande. O tamanho máximo permitido é ${PRINTING_CONFIG.maxFileSize / (1024 * 1024)}MB.`);
      return;
    }
    
    // Check file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !PRINTING_CONFIG.supportedFormats.includes(fileExtension)) {
      alert(`Formato de arquivo não suportado. Formatos aceitos: ${PRINTING_CONFIG.supportedFormats.join(', ')}`);
      return;
    }
    
    // Pass the file to the parent component
    onUpload(file);
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className={className}>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        } transition-colors cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-gray-600">Processando seu modelo...</p>
          </div>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isDragging ? 'Solte o arquivo aqui' : 'Arraste e solte seu arquivo STL aqui'}
            </h3>
            <p className="text-gray-600 mb-4">ou clique para selecionar um arquivo</p>
            <p className="text-sm text-gray-500">
              Tamanho máximo: {PRINTING_CONFIG.maxFileSize / (1024 * 1024)}MB. 
              Formatos aceitos: {PRINTING_CONFIG.supportedFormats.join(', ')}
            </p>
          </>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={PRINTING_CONFIG.supportedFormats.map(format => `.${format}`).join(',')}
          className="hidden"
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Dicas para upload:</h4>
        <ul className="space-y-1 text-sm text-gray-600 list-disc pl-5">
          <li>Certifique-se de que seu modelo é um sólido fechado (watertight)</li>
          <li>Dimensões recomendadas: máximo de 20cm em qualquer direção</li>
          <li>Evite detalhes muito pequenos (menores que 0.8mm)</li>
          <li>Verifique se o modelo está na orientação correta para impressão</li>
        </ul>
      </div>
    </div>
  );
};

export default ModelUploader;