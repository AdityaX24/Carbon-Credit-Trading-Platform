from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('/Users/adityapoddar/Desktop/Capstone Backend/test_model.joblib')

class PredictionRequest(BaseModel):
    bulk_density_Mg_m3_current: float
    temperature_Celsiul: float
    percent_clay_current: float
    percent_silt_current: float
    Bulkdensity_previous: float
    percent_clay_previous: float
    percent_sand_previous: float
    SOC_Mg_ha_previous: float
    fertilizerYESNO_NO: int
    fertilizerYESNO_YES: int
    tillageYESNO_NO: int
    tillageYESNO_YES: int
    tillage_type_NO: int
    tillage_type_mowing: int
    tillage_type_normal: int
    tillage_type_reduced: int
    tillage_type_subsoil: int

class PredictionResponse(BaseModel):
    SOC_Mg_ha_current: float

@app.post('/predict', response_model=PredictionResponse)
def predict(data: PredictionRequest):
    input_data = pd.DataFrame([data.dict()])

    input_data = input_data[[
        'bulk_density_Mg_m3_current',
        'temperature_Celsiul',
        'percent_clay_current',
        'percent_silt_current',
        'Bulkdensity_previous',
        'percent_clay_previous',
        'percent_sand_previous',
        'SOC_Mg_ha_previous',
        'fertilizerYESNO_NO',
        'fertilizerYESNO_YES',
        'tillageYESNO_NO',
        'tillageYESNO_YES',
        'tillage_type_NO',
        'tillage_type_mowing',
        'tillage_type_normal',
        'tillage_type_reduced',
        'tillage_type_subsoil'
    ]]

    prediction = model.predict(input_data)

    return {'SOC_Mg_ha_current': float(prediction[0])}
