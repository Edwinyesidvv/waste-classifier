import React, { useState } from 'react';
import { analyzeImage } from '../api/vision';
import { calculatePoints, getDiscountByPoints, weeklyChallengeBonus } from '../utils/scoring';

const WasteUploader = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('organic');
  const [points, setPoints] = useState(0);
  const [photosSubmitted, setPhotosSubmitted] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleEvaluation = async () => {
    if (!image) return alert('Por favor selecciona una imagen.');

    const labels = await analyzeImage(image);
    let earnedPoints = calculatePoints(category, labels);
     console.log('earnedPoints',earnedPoints)
    if (earnedPoints === 10) {
      setPhotosSubmitted(prev => prev + 1);
    }

    setPoints(prev => {
      const newTotal = prev + earnedPoints;
      let finalTotal = newTotal;

      if ((photosSubmitted + 1) % 5 === 0) {
        finalTotal += weeklyChallengeBonus;
      }

      setDiscount(getDiscountByPoints(finalTotal));
      return finalTotal;
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Clasificador de Residuos</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="organic">Orgánico</option>
        <option value="plastic">Plástico</option>
        <option value="paper">Papel</option>
        <option value="glass">Vidrio</option>
        <option value="metal">Metal</option>
      </select>
      <button onClick={handleEvaluation}>Subir y Evaluar</button>

      <div style={{ marginTop: 20 }}>
        <p><strong>Puntos acumulados:</strong> {points}</p>
        <p><strong>Fotos buenas enviadas:</strong> {photosSubmitted}</p>
        <p><strong>Descuento actual:</strong> {discount}%</p>
      </div>
    </div>
  );
};

export default WasteUploader;