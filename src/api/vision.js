import axios from 'axios';

const API_URL = 'https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224';
const API_TOKEN = import.meta.env.VITE_API_KEY; // <<--- Reemplaza esto por tu token de HuggingFace

export const analyzeImage = async (base64Image) => {
  try {
    
    const response = await axios.post(
      API_URL,
      {
        inputs: `data:image/jpeg;base64,${base64Image}`, 
        
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          Accept: 'application/json',
        },
      }
    );
     console.log('response', response);
    const labels = response.data || [];
    
    /*
    const labels =[

      {
          "label": "water bottle",
          "score": 0.7331898808479309
      },
      {
          "label": "pop bottle, soda bottle",
          "score": 0.16229084134101868
      },
      {
          "label": "plastic bag",
          "score": 0.012174058705568314
      },
      {
          "label": "water jug",
          "score": 0.010301985777914524
      },
      {
          "label": "nipple",
          "score": 0.010166114196181297
      }
  ]*/

    if (Array.isArray(labels)) {
      // Si es lista de predicciones
      return labels.map(label => ({
        description: label.label.toLowerCase(),
        score: label.score,
      }));
    } else {
      console.warn('Respuesta inesperada de HuggingFace:', labels);
      return [];
    }
  } catch (error) {
    console.error('Error analyzing image with HuggingFace API:', error.response?.data || error.message);
    return [];
  }
};
