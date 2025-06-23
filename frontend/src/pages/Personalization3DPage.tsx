import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';
import MainLayout from '../components/layout/MainLayout';

// Mock 3D Model component
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

const Personalization3DPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modelVolume, setModelVolume] = useState<number>(0);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('PLA');
  const [selectedColor, setSelectedColor] = useState<string>('#2196F3');
  const [price, setPrice] = useState<number>(0);
  const [printTime, setPrintTime] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock materials data
  const materials = [
    { id: 'PLA', name: 'PLA', price: 0.15, description: 'Econômico e biodegradável' },
    { id: 'ABS', name: 'ABS', price: 0.20, description: 'Resistente e durável' },
    { id: 'PETG', name: 'PETG', price: 0.25, description: 'Resistente a impactos e água' },
    { id: 'TPU', name: 'TPU', price: 0.30, description: 'Flexível e elástico' },
  ];
  
  // Mock colors data
  const colors = [
    { id: 'blue', value: '#2196F3', name: 'Azul' },
    { id: 'green', value: '#4CAF50', name: 'Verde' },
    { id: 'orange', value: '#FF9800', name: 'Laranja' },
    { id: 'red', value: '#F44336', name: 'Vermelho' },
    { id: 'purple', value: '#9C27B0', name: 'Roxo' },
    { id: 'black', value: '#000000', name: 'Preto' },
    { id: 'white', value: '#FFFFFF', name: 'Branco' },
  ];
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (max 25MB)
      if (selectedFile.size > 25 * 1024 * 1024) {
        alert('O arquivo é muito grande. O tamanho máximo permitido é 25MB.');
        return;
      }
      
      // Check file extension
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'stl') {
        alert('Apenas arquivos STL são suportados.');
        return;
      }
      
      setFile(selectedFile);
      setIsLoading(true);
      
      // Simulate loading and processing
      setTimeout(() => {
        // In a real app, we would parse the STL file and calculate its volume
        // For this demo, we'll use a random volume
        const randomVolume = Math.random() * 100 + 50; // 50-150 cm³
        setModelVolume(randomVolume);
        
        // Calculate price based on volume and material
        const materialPrice = materials.find(m => m.id === selectedMaterial)?.price || 0.15;
        const calculatedPrice = randomVolume * materialPrice;
        setPrice(calculatedPrice);
        
        // Calculate print time (simplified)
        const calculatedPrintTime = randomVolume / 15; // Approx. hours
        setPrintTime(calculatedPrintTime);
        
        // For demo purposes, we'll use a placeholder model
        setPreviewUrl('/models/example.glb');
        setIsLoading(false);
      }, 2000);
    }
  };
  
  // Recalculate price when material changes
  useEffect(() => {
    if (modelVolume > 0) {
      const materialPrice = materials.find(m => m.id === selectedMaterial)?.price || 0.15;
      const calculatedPrice = modelVolume * materialPrice;
      setPrice(calculatedPrice);
    }
  }, [selectedMaterial, modelVolume]);
  
  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-2">Personalização 3D</h1>
        <p className="text-gray-600 mb-8">
          Faça upload do seu modelo 3D, escolha o material e as cores, e nós imprimimos para você!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* 3D Preview Area */}
              <div className="h-96 bg-gray-100 relative">
                {previewUrl ? (
                  <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
                    <color attach="background" args={['#f5f5f5']} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Stage environment="city" intensity={0.6}>
                      <Model url={previewUrl} />
                    </Stage>
                    <OrbitControls autoRotate />
                  </Canvas>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    {isLoading ? (
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                        <p className="text-gray-600">Processando seu modelo...</p>
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Faça upload do seu modelo 3D</h3>
                        <p className="text-gray-600 mb-4">Suportamos arquivos STL de até 25MB</p>
                        <button 
                          onClick={handleUploadClick}
                          className="btn-primary"
                        >
                          Selecionar Arquivo
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".stl"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Upload Instructions */}
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Instruções para Upload</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Seu arquivo deve estar no formato STL</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Tamanho máximo de 25MB</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>O modelo deve ser um sólido fechado (watertight)</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dimensões recomendadas: máximo de 20cm em qualquer direção</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Column - Options and Pricing */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Opções de Impressão</h3>
              
              {/* Material Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Material</label>
                <div className="grid grid-cols-2 gap-3">
                  {materials.map((material) => (
                    <div 
                      key={material.id}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        selectedMaterial === material.id 
                          ? 'border-primary bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedMaterial(material.id)}
                    >
                      <div className="font-medium">{material.name}</div>
                      <div className="text-xs text-gray-500">{material.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Cor</label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <div 
                      key={color.id}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                        selectedColor === color.value 
                          ? 'border-gray-900' 
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              {/* Quality Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Qualidade de Impressão</label>
                <select className="input-field">
                  <option value="high">Alta (0.1mm)</option>
                  <option value="medium" selected>Média (0.2mm)</option>
                  <option value="low">Baixa (0.3mm)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Camadas mais finas resultam em melhor qualidade, mas aumentam o tempo de impressão.
                </p>
              </div>
              
              {/* Infill Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Preenchimento</label>
                <select className="input-field">
                  <option value="20">Padrão (20%)</option>
                  <option value="50">Médio (50%)</option>
                  <option value="80">Alto (80%)</option>
                  <option value="100">Sólido (100%)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Maior preenchimento resulta em peças mais resistentes, mas aumenta o custo.
                </p>
              </div>
            </div>
            
            {/* Pricing Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo</h3>
              
              {modelVolume > 0 ? (
                <>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Volume do Modelo:</span>
                      <span className="font-medium">{modelVolume.toFixed(2)} cm³</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material:</span>
                      <span className="font-medium">{materials.find(m => m.id === selectedMaterial)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tempo Estimado:</span>
                      <span className="font-medium">{printTime.toFixed(1)} horas</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                      <span className="text-gray-900 font-medium">Preço Total:</span>
                      <span className="text-primary text-xl font-bold">R$ {price.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary w-full mb-3">
                    Adicionar ao Carrinho
                  </button>
                  <button className="btn-secondary w-full">
                    Salvar Modelo
                  </button>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">
                    Faça upload do seu modelo para ver o preço estimado.
                  </p>
                  <button 
                    onClick={handleUploadClick}
                    className="btn-primary"
                  >
                    Selecionar Arquivo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quais formatos de arquivo são aceitos?</h3>
              <p className="text-gray-600">
                Atualmente aceitamos apenas arquivos no formato STL. Certifique-se de que seu modelo seja um sólido fechado (watertight) para garantir uma impressão de qualidade.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Como é calculado o preço?</h3>
              <p className="text-gray-600">
                O preço é calculado com base no volume do modelo, no material escolhido, na qualidade de impressão e no preenchimento. Modelos maiores e mais complexos tendem a ser mais caros.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quanto tempo leva para receber meu produto?</h3>
              <p className="text-gray-600">
                O tempo de produção varia de acordo com o tamanho e a complexidade do modelo, além da nossa fila de impressão atual. Após a impressão, o envio é feito em até 2 dias úteis.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Posso modificar meu modelo depois de enviá-lo?</h3>
              <p className="text-gray-600">
                Sim, você pode modificar seu modelo antes de finalizar o pedido. Após a confirmação do pedido, não será possível fazer alterações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Personalization3DPage;