import { useState } from 'react'
import './App.css'
import { TransactionContext  } from './context/Master_TransactionContext';
import React, { useContext } from 'react';

const App = () => {

  const { connectWallet, currentAccount, soilCarbonContent, setSoilCarbonContent, sendTransaction } = useContext(TransactionContext);

  const [formData, setFormData] = useState({
    bulk_density_Mg_m3_current: '',
    temperature_Celsius: '',
    percent_clay_current: '',
    percent_silt_current: '',
    Bulkdensity_previous: '',
    percent_clay_previous: '',
    percent_sand_previous: '',
    SOC_Mg_ha_previous: '',
    fertilizer: 'YES',
    tillage: 'YES',
    tillage_type: 'normal'
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const data = {
      bulk_density_Mg_m3_current: parseFloat(formData.bulk_density_Mg_m3_current),
      temperature_Celsiul: parseFloat(formData.temperature_Celsius),
      percent_clay_current: parseFloat(formData.percent_clay_current),
      percent_silt_current: parseFloat(formData.percent_silt_current),
      Bulkdensity_previous: parseFloat(formData.Bulkdensity_previous),
      percent_clay_previous: parseFloat(formData.percent_clay_previous),
      percent_sand_previous: parseFloat(formData.percent_sand_previous),
      SOC_Mg_ha_previous: parseFloat(formData.SOC_Mg_ha_previous),
      fertilizerYESNO_YES: formData.fertilizer === 'YES' ? 1 : 0,
      fertilizerYESNO_NO: formData.fertilizer === 'NO' ? 1 : 0,
      tillageYESNO_YES: formData.tillage === 'YES' ? 1 : 0,
      tillageYESNO_NO: formData.tillage === 'NO' ? 1 : 0,
      tillage_type_NO: formData.tillage_type === 'NO' ? 1 : 0,
      tillage_type_mowing: formData.tillage_type === 'mowing' ? 1 : 0,
      tillage_type_normal: formData.tillage_type === 'normal' ? 1 : 0,
      tillage_type_reduced: formData.tillage_type === 'reduced' ? 1 : 0,
      tillage_type_subsoil: formData.tillage_type === 'subsoil' ? 1 : 0
    };

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Error: ' + response.statusText);
      }

      const resultData = await response.json();
      setResult(resultData.SOC_Mg_ha_current);

      // console.log(tyepof result);
      console.log(typeof resultData.SOC_Mg_ha_current);
      setSoilCarbonContent(resultData.SOC_Mg_ha_current);
      sendTransaction(resultData.SOC_Mg_ha_current);

      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="container">
      {!currentAccount && (<button
                    type="button"
                    onClick={connectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        <p className="text-white text-base text-semibold">Connect Wallet</p>
                    </button>
                    )}
      <h1>Predict SOC Mg/ha Current</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p className="text-black">Bulk Density Mg/m³ Current: </p>
          <input
            type="number"
            name="bulk_density_Mg_m3_current"
            value={formData.bulk_density_Mg_m3_current}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Temperature (°C):
          <input
            type="number"
            name="temperature_Celsius"
            value={formData.temperature_Celsius}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Percent Clay Current:
          <input
            type="number"
            name="percent_clay_current"
            value={formData.percent_clay_current}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Percent Silt Current:
          <input
            type="number"
            name="percent_silt_current"
            value={formData.percent_silt_current}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Bulk Density Previous:
          <input
            type="number"
            name="Bulkdensity_previous"
            value={formData.Bulkdensity_previous}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Percent Clay Previous:
          <input
            type="number"
            name="percent_clay_previous"
            value={formData.percent_clay_previous}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Percent Sand Previous:
          <input
            type="number"
            name="percent_sand_previous"
            value={formData.percent_sand_previous}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          SOC Mg/ha Previous:
          <input
            type="number"
            name="SOC_Mg_ha_previous"
            value={formData.SOC_Mg_ha_previous}
            onChange={handleChange}
            required
          />
        </label>

        {/* Fertilizer YES/NO */}
        <label>Fertilizer Applied?</label>
        <div>
          <label>
            <input
              type="radio"
              name="fertilizer"
              value="YES"
              checked={formData.fertilizer === 'YES'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="fertilizer"
              value="NO"
              checked={formData.fertilizer === 'NO'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Tillage YES/NO */}
        <label>Tillage Done?</label>
        <div>
          <label>
            <input
              type="radio"
              name="tillage"
              value="YES"
              checked={formData.tillage === 'YES'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="tillage"
              value="NO"
              checked={formData.tillage === 'NO'}
              onChange={handleChange}
            />
            No
          </label>
        </div>

        {/* Tillage Type */}
        <label>Tillage Type:</label>
        <select name="tillage_type" value={formData.tillage_type} onChange={handleChange}>
          <option value="NO">No Tillage</option>
          <option value="mowing">Mowing</option>
          <option value="normal">Normal</option>
          <option value="reduced">Reduced</option>
          <option value="subsoil">Subsoil</option>
        </select>

        <button type="submit">Get Prediction</button>
      </form>

      {result && <div className="result">Predicted SOC Mg/ha Current: {result}</div>}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
}

export default App
