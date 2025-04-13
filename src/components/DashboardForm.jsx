import React, { useState } from "react";
import axios from "axios";
import "../css/DForm.css"; // Import CSS

function DashboardForm() {
  const [formData, setFormData] = useState({
    Soil_Type: "",
    Soil_pH: "",
    Temperature: "",
    Humidity: "",
    N: "",
    P: "",
    K: "",

    Soil_Quality: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction({ error: "Prediction failed. Try again!" });
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Crop Yield Prediction</h2>
      <form onSubmit={handleSubmit}>

        <input type="text" name="Soil_Type" placeholder="Soil Type" onChange={handleChange} required className="input-field" />
        <input type="number" name="Soil_pH" placeholder="Soil pH" onChange={handleChange} required className="input-field" />
        <input type="number" name="Temperature" placeholder="Temperature (°C)" onChange={handleChange} required className="input-field" />
        <input type="number" name="Humidity" placeholder="Humidity (%)" onChange={handleChange} required className="input-field" />
        <input type="number" name="N" placeholder="Nitrogen (N)" onChange={handleChange} required className="input-field" />
        <input type="number" name="P" placeholder="Phosphorus (P)" onChange={handleChange} required className="input-field" />
        <input type="number" name="K" placeholder="Potassium (K)" onChange={handleChange} required className="input-field" />
        <input type="number" name="Soil_Quality" placeholder="Soil Quality" onChange={handleChange} required className="input-field" />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {prediction && (
        <div className="prediction-container">
          {prediction.error ? (
            <p className="error-message">{prediction.error}</p>
          ) : (
            <div>
              <h3>Prediction Results:</h3>
              <p><strong>Predicted Crop Type:</strong> {prediction.predicted_crop}</p>
              <p><strong>Predicted Yield:</strong> {prediction.predicted_yield} tons</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardForm;
