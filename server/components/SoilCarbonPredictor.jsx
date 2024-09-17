import React, { useEffect, useRef, useState, useContext } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { TransactionContext  } from '../src/context/Master_TransactionContext';


// Styled components
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  minHeight: '100vh',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  position: 'relative',
  backgroundColor: 'rgba(0, 0, 0, 1)', // Semi-transparent background
  color: '#ffffff',
  zIndex: 1,
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
  width: '100%',
  maxWidth: 500,
});

const StyledForm = styled(motion.form)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  padding: theme.spacing(4),
  borderRadius: 20,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 0 0 4px rgba(0, 125, 250, 0.1)',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 4px rgba(0, 125, 250, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff',
  },
  '& .MuiOutlinedInput-input': {
    color: '#ffffff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 10,
  '&:hover': {
    boxShadow: '0 0 0 4px rgba(0, 125, 250, 0.1)',
  },
  '&.Mui-focused': {
    boxShadow: '0 0 0 4px rgba(0, 125, 250, 0.2)',
  },
  '& .MuiSelect-select': {
    color: '#ffffff',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 10,
  padding: theme.spacing(1.5),
  backgroundColor: '#007AFF',
  color: 'white',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
    transform: 'scale(1.02)',
  },
}));

const NextButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 10,
  padding: theme.spacing(1),
  backgroundColor: '#34C759',
  color: 'white',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#2EAF4D',
    transform: 'scale(1.02)',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  color: '#ffffff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
}));

const ResultBox = styled(motion.div)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 10,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
}));

// const ParticleBackground = styled(Box)({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   zIndex: -1,
// });

const ParticleBackground = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
});

const formFields = [
  { name: 'fertilizer', label: 'Fertilizer Used', type: 'select', options: ['YES', 'NO'] },
  { name: 'tillage', label: 'Tillage Used', type: 'select', options: ['YES', 'NO'] },
  { name: 'tillage_type', label: 'Tillage Type', type: 'select', options: ['MOWING', 'NORMAL', 'REDUCED', 'SUBSOIL'] },
  { name: 'bulk_density_Mg_m3_current', label: 'Current Bulk Density (Mg/m³)', type: 'number' },
  { name: 'temperature_Celsiul', label: 'Temperature (°C)', type: 'number' },
  { name: 'percent_clay_current', label: 'Current Clay (%)', type: 'number' },
  { name: 'percent_silt_current', label: 'Current Silt (%)', type: 'number' },
  { name: 'Bulkdensity_previous', label: 'Previous Bulk Density (Mg/m³)', type: 'number' },
  { name: 'percent_clay_previous', label: 'Previous Clay (%)', type: 'number' },
  { name: 'percent_sand_previous', label: 'Previous Sand (%)', type: 'number' },
  { name: 'SOC_Mg_ha_previous', label: 'Previous SOC (Mg/ha)', type: 'number' },
];

const SoilCarbonPredictor = () => {
  const [formData, setFormData] = useState({
        bulk_density_Mg_m3_current: '',
        temperature_Celsiul: '',
        percent_clay_current: '',
        percent_silt_current: '',
        Bulkdensity_previous: '',
        percent_clay_previous: '',
        percent_sand_previous: '',
        SOC_Mg_ha_previous: '',
        fertilizer: 'YES',
        tillage: 'YES',
        tillage_type: 'NORMAL'
      });
  const [currentField, setCurrentField] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const particleRef = useRef(null);
  const [error, setError] = useState(null);
  const { connectWallet, currentAccount, soilCarbonContent, setSoilCarbonContent, sendTransaction } = useContext(TransactionContext);
  const [ result, setResult] = useState('');


  // useEffect(() => {
  //   let scene, camera, renderer, particles, stats;
  //   let mouseX = 0, mouseY = 0;
  //   let windowHalfX = window.innerWidth / 2;
  //   let windowHalfY = window.innerHeight / 2;

  //   const init = () => {
  //     scene = new THREE.Scene();
  //     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  //     camera.position.z = 1000;

  //     const geometry = new THREE.BufferGeometry();
  //     const vertices = [];
  //     const size = 2000;

  //     for (let i = 0; i < 8000; i++) {
  //       const x = Math.random() * size - size / 2;
  //       const y = Math.random() * size - size / 2;
  //       const z = Math.random() * size - size / 2;
  //       vertices.push(x, y, z);
  //     }

  //     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  //     const material = new THREE.PointsMaterial({
  //       size: 2,
  //       color: 0xffffff,
  //       transparent: true,
  //       opacity: 0.7,
  //       sizeAttenuation: true,
  //     });

  //     particles = new THREE.Points(geometry, material);
  //     scene.add(particles);

  //     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  //     renderer.setPixelRatio(window.devicePixelRatio);
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     renderer.setClearColor(0x000000, 0);
  //     particleRef.current.appendChild(renderer.domElement);

  //     stats = new Stats();
  //     particleRef.current.appendChild(stats.dom);

  //     document.addEventListener('mousemove', onDocumentMouseMove);
  //     window.addEventListener('resize', onWindowResize);
  //   };

  //   const onWindowResize = () => {
  //     windowHalfX = window.innerWidth / 2;
  //     windowHalfY = window.innerHeight / 2;
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //   };

  //   const onDocumentMouseMove = (event) => {
  //     mouseX = (event.clientX - windowHalfX) / 3;
  //     mouseY = (event.clientY - windowHalfY) / 3;
  //   };

  //   const animate = () => {
  //     requestAnimationFrame(animate);
  //     render();
  //     stats.update();
  //   };

  //   const render = () => {
  //     camera.position.x += (mouseX - camera.position.x) * 0.05;
  //     camera.position.y += (-mouseY - camera.position.y) * 0.05;
  //     camera.lookAt(scene.position);

  //     const time = Date.now() * 0.00005;
  //     particles.rotation.y = time * 0.5;
  //     particles.position.y = Math.sin(time * 2) * 10;

  //     renderer.render(scene, camera);
  //   };

  //   init();
  //   animate();

  //   return () => {
  //     if (particleRef.current) {
  //       particleRef.current.removeChild(renderer.domElement);
  //       particleRef.current.removeChild(stats.dom);
  //     }
  //     window.removeEventListener('resize', onWindowResize);
  //     document.removeEventListener('mousemove', onDocumentMouseMove);
  //   };
  // }, []);

  useEffect(() => {
    let scene, camera, renderer, particles, stats;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
  
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
      camera.position.z = 1000;
  
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const size = 2000;
  
      for (let i = 0; i < 8000; i++) {
        const x = Math.random() * size - size / 2;
        const y = Math.random() * size - size / 2;
        const z = Math.random() * size - size / 2;
        vertices.push(x, y, z);
      }
  
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  
      // Updated material with gradient-like environmental colors
      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });
  
      // Adding environmental colors (light green, light blue, light yellow)
      const colors = [];
      for (let i = 0; i < vertices.length; i += 3) {
        colors.push(0.6, 0.8, 0.4); // light green
        colors.push(0.5, 0.7, 1);   // light blue
        colors.push(1, 0.9, 0.4);   // light yellow
      }
  
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
      particles = new THREE.Points(geometry, material);
      scene.add(particles);
  
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      particleRef.current.appendChild(renderer.domElement);
  
      stats = new Stats();
      particleRef.current.appendChild(stats.dom);
  
      document.addEventListener('mousemove', onDocumentMouseMove);
      window.addEventListener('resize', onWindowResize);
    };
  
    const onWindowResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
  
    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / 3;
      mouseY = (event.clientY - windowHalfY) / 3;
    };
  
    const animate = () => {
      requestAnimationFrame(animate);
      render();
      stats.update();
    };
  
    const render = () => {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
  
      const time = Date.now() * 0.00005;
      particles.rotation.y = time * 0.5;
      particles.position.y = Math.sin(time * 2) * 10;
  
      renderer.render(scene, camera);
    };
  
    init();
    animate();
  
    return () => {
      if (particleRef.current) {
        particleRef.current.removeChild(renderer.domElement);
        particleRef.current.removeChild(stats.dom);
      }
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (formFields[currentField].type === 'select') {
      moveToNextField();
    }
  };

  const moveToNextField = () => {
    if (currentField < formFields.length - 1) {
      setCurrentField(currentField + 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      moveToNextField();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const data = {
      bulk_density_Mg_m3_current: parseFloat(formData.bulk_density_Mg_m3_current),
      temperature_Celsiul: parseFloat(formData.temperature_Celsiul),
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
      tillage_type_mowing: formData.tillage_type === 'MOWING' ? 1 : 0,
      tillage_type_normal: formData.tillage_type === 'NORMAL' ? 1 : 0,
      tillage_type_reduced: formData.tillage_type === 'REDUCED' ? 1 : 0,
      tillage_type_subsoil: formData.tillage_type === 'SUBSOIL' ? 1 : 0
    };

    console.log(data);

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

  const renderField = (field) => {
    return (
      <Box key={field.name}>
        {field.type === 'select' ? (
          <FormControl fullWidth margin="normal" key={field.name}>
            <InputLabel style={{ color: '#ffffff' }}>{field.label}</InputLabel>
            <StyledSelect
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required
            >
              {field.options.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        ) : (
          <StyledTextField
            fullWidth
            margin="normal"
            name={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            required
          />
        )}
        <NextButton onClick={moveToNextField} fullWidth>
          Next
        </NextButton>
      </Box>
    );
  };
  


  // const renderField = (field) => {
  //   if (field.type === 'select') {
  //     return (
  //       <FormControl fullWidth margin="normal" key={field.name}>
  //         <InputLabel style={{ color: '#ffffff' }}>{field.label}</InputLabel>
  //         <StyledSelect
  //           name={field.name}
  //           value={formData[field.name] || ''}
  //           onChange={handleChange}
  //           required
  //         >
  //           {field.options.map(option => (
  //             <MenuItem key={option} value={option}>{option}</MenuItem>
  //           ))}
  //         </StyledSelect>
  //       </FormControl>
  //     );
  //   } else {
  //     return (
  //       <Box key={field.name}>
  //         <StyledTextField
  //           fullWidth
  //           margin="normal"
  //           name={field.name}
  //           label={field.label}
  //           type={field.type}
  //           value={formData[field.name] || ''}
  //           onChange={handleChange}
  //           onKeyPress={handleKeyPress}
  //           required
  //         />
  //         <NextButton onClick={moveToNextField} fullWidth>
  //           Next
  //         </NextButton>
  //       </Box>
  //     );
  //   }
  // };

  return (
    <StyledBox>
      <ParticleBackground ref={particleRef} />
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StyledTypography variant="h4" align="center">
            Soil Carbon Predictor
          </StyledTypography>
        </motion.div>
        <StyledForm
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentField}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderField(formFields[currentField])}
            </motion.div>
          </AnimatePresence>
          {currentField === formFields.length - 1 && (
            <StyledButton 
              type="submit" 
              variant="contained" 
              fullWidth 
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Predict Soil Carbon'}
            </StyledButton>
          )}
        </StyledForm>

        <AnimatePresence>
          {prediction !== null && (
            <ResultBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" align="center" style={{ color: '#ffffff' }}>
                Predicted Soil Carbon: {prediction.toFixed(2)} SOC MG/ha
              </Typography>
            </ResultBox>
          )}
        </AnimatePresence>
      </ContentWrapper>
    </StyledBox>
  );
};

export default SoilCarbonPredictor;