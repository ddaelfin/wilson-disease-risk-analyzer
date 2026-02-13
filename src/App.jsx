import { useState } from 'react';
import './App.css'

function App() {
  const [step, setStep] = useState(1); 
  
  
  // Blood test values
  const [bloodTests, setBloodTests] = useState({
    ceruloplasmin: '',
    serumCopper: '',
    urineCopper: '',
    alt: '',
    ast: ''
  });
  
  // Selected symptoms
  const [symptoms, setSymptoms] = useState([]);

  // Handle blood test input changes
  const handleBloodTestChange = (field, value) => {
    setBloodTests({
      ...bloodTests,
      [field]: value
    });
  };

  // Submit blood tests and move to symptoms
  const handleBloodTestSubmit = (e) => {
    e.preventDefault();
    console.log('Blood tests:', bloodTests);
    setStep(2); // Move to symptom selection
  };



// Calculate risk score based on blood tests and symptoms
const calculateRisk = () => {
  let score = 0;
  let findings = [];
  
  // Blood test scoring
  const ceruloplasmin = parseFloat(bloodTests.ceruloplasmin);
  const urineCopper = parseFloat(bloodTests.urineCopper);
  const alt = parseFloat(bloodTests.alt);
  const ast = parseFloat(bloodTests.ast);
  
  // Ceruloplasmin scoring (most important)
  if (ceruloplasmin < 20) {
    if (ceruloplasmin < 10) {
      score += 4;
      findings.push('Very low ceruloplasmin (<10 mg/dL) - highly suspicious');
    } else {
      score += 2;
      findings.push('Low ceruloplasmin (10-20 mg/dL) - concerning');
    }
  }
  
  // Urine copper scoring
  if (urineCopper > 100) {
    score += 3;
    findings.push('Elevated 24h urine copper (>100 μg/day) - highly abnormal');
  } else if (urineCopper > 40) {
    score += 1;
    findings.push('Mildly elevated urine copper (40-100 μg/day)');
  }
  
  // Liver enzymes
  if (alt > 56 || ast > 40) {
    score += 1;
    findings.push('Elevated liver enzymes detected');
  }
  
  // Symptom scoring with weights
  const symptomWeights = {
    'kayser-fleischer': 5,
    'tremor': 3,
    'speech-difficulty': 3,
    'jaundice': 2,
    'difficulty-walking': 2,
    'abdominal-pain': 1,
    'fatigue': 1
  };
  
  symptoms.forEach(symptom => {
    const weight = symptomWeights[symptom] || 1;
    score += weight;
    
    if (symptom === 'kayser-fleischer') {
      findings.push('!! CRITICAL: Kayser-Fleischer rings present');
    }
  });
  
  // Determine risk level
  let riskLevel = 'Low';
  let riskColor = '#28a745';
  let recommendation = '';
  
  if (score >= 8) {
    riskLevel = 'Very High';
    riskColor = '#dc3545';
    recommendation = 'URGENT: High suspicion for Wilson\'s Disease. Seek immediate consultation with a hepatologist or geneticist for genetic testing.';
  } else if (score >= 5) {
    riskLevel = 'High';
    riskColor = '#fd7e14';
    recommendation = 'Concerning pattern detected. Schedule appointment with a specialist for further evaluation and possible genetic testing.';
  } else if (score >= 3) {
    riskLevel = 'Moderate';
    riskColor = '#ffc107';
    recommendation = 'Some abnormalities detected. Discuss results with your primary care physician.';
  } else {
    riskLevel = 'Low';
    riskColor = '#28a745';
    recommendation = 'Results appear within normal ranges. Continue routine health monitoring.';
  }
  
  return {
    score,
    riskLevel,
    riskColor,
    findings,
    recommendation
  };
};

  return (
    <div className="App">
      <h1>Wilson's Disease Risk Analyzer</h1>
      
      {/* STEP 1: Blood Tests */}
      {step === 1 && (
        <form onSubmit={handleBloodTestSubmit}>
          <h2>Step 1: Enter Blood Test Results</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Ceruloplasmin (mg/dL):
            </label>
            <input
              type="number"
              step="0.1"
              value={bloodTests.ceruloplasmin}
              onChange={(e) => handleBloodTestChange('ceruloplasmin', e.target.value)}
              placeholder="Normal: 20-40"
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Serum Copper (μg/dL):
            </label>
            <input
              type="number"
              step="0.1"
              value={bloodTests.serumCopper}
              onChange={(e) => handleBloodTestChange('serumCopper', e.target.value)}
              placeholder="Normal: 70-140"
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '5px' }}>
              24h Urine Copper (μg/day):
            </label>
            <input
              type="number"
              step="0.1"
              value={bloodTests.urineCopper}
              onChange={(e) => handleBloodTestChange('urineCopper', e.target.value)}
              placeholder="Normal: <40"
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              ALT (U/L):
            </label>
            <input
              type="number"
              step="0.1"
              value={bloodTests.alt}
              onChange={(e) => handleBloodTestChange('alt', e.target.value)}
              placeholder="Normal: 7-56"
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              AST (U/L):
            </label>
            <input
              type="number"
              step="0.1"
              value={bloodTests.ast}
              onChange={(e) => handleBloodTestChange('ast', e.target.value)}
              placeholder="Normal: 10-40"
              style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            />
          </div>

          <button  type="submit" className="btn btn-primary">
            Continue to Symptoms
          </button>
        </form>
      )}

    {/* STEP 2: Symptoms */}
{step === 2 && (
  <div>
    <h2>Step 2: Select Your Symptoms</h2>
    <p style={{ color: '#666', marginBottom: '20px' }}>
      Check all symptoms you're experiencing:
    </p>

    {/* Hepatic Symptoms */}
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ color: 'darkcyan' }}>Liver Symptoms</h3>
      
      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={symptoms.includes('jaundice')}
          onChange={(e) => {
            if (e.target.checked) {
              setSymptoms([...symptoms, 'jaundice']);
            } else {
              setSymptoms(symptoms.filter(s => s !== 'jaundice'));
            }
          }}
        />
        {' '}Jaundice (yellowing of skin/eyes)
      </label>

      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={symptoms.includes('abdominal-pain')}
          onChange={(e) => {
            if (e.target.checked) {
              setSymptoms([...symptoms, 'abdominal-pain']);
            } else {
              setSymptoms(symptoms.filter(s => s !== 'abdominal-pain'));
            }
          }}
        />
        {' '}Abdominal Pain
      </label>

      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={symptoms.includes('fatigue')}
          onChange={(e) => {
            if (e.target.checked) {
              setSymptoms([...symptoms, 'fatigue']);
            } else {
              setSymptoms(symptoms.filter(s => s !== 'fatigue'));
            }
          }}
        />
        {' '}Persistent Fatigue
      </label>
    </div>

    {/* Neurological Symptoms */}
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{ color: '#5bc0de' }}>Neurological Symptoms</h3>
      
      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={symptoms.includes('tremor')}
          onChange={(e) => {
            if (e.target.checked) {
              setSymptoms([...symptoms, 'tremor']);
            } else {
              setSymptoms(symptoms.filter(s => s !== 'tremor'));
            }
          }}
        />
        {' '}Tremor (shaking hands)
      </label>

      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={symptoms.includes('speech-difficulty')}
          onChange={(e) => {
            if (e.target.checked) {
              setSymptoms([...symptoms, 'speech-difficulty']);
            } else {
              setSymptoms(symptoms.filter(s => s !== 'speech-difficulty'));
            }
          }}
        />
        {' '}Speech Difficulties (slurred speech)
      </label>

      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={symptoms.includes('difficulty-walking')}
          onChange={(e) => {
            if (e.target.checked) {
              setSymptoms([...symptoms, 'difficulty-walking']);
            } else {
              setSymptoms(symptoms.filter(s => s !== 'difficulty-walking'));
            }
          }}
        />
        {' '}Difficulty Walking/Coordination Problems
      </label>
    </div>

    {/* Critical Symptom */}
    <div style={{ marginBottom: '30px', backgroundColor: '#fff3cd', padding: '15px', borderRadius: '4px' }}>
      <h3 style={{ color: '#856404' }}>Critical Sign</h3>
      
      <label style={{ display: 'block', margin: '10px 0' }}>
        <input
          type="checkbox"
          checked={symptoms.includes('kayser-fleischer')}
          onChange={(e) => {
            if (e.target.checked) {
              setSymptoms([...symptoms, 'kayser-fleischer']);
            } else {
              setSymptoms(symptoms.filter(s => s !== 'kayser-fleischer'));
            }
          }}
        />
        {' '}<strong>Kayser-Fleischer Rings</strong> (brown/green ring around cornea - seen in eye exam)
      </label>
    </div>

    <p style={{ margin: '20px 0' }}>
      Selected: <strong>{symptoms.length}</strong> symptoms
    </p>

    <div style={{ display: 'flex', gap: '10px' }}>
      <button 
        onClick={() => setStep(1)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back
      </button>
      
      <button 
        onClick={() => setStep(3)}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: 'teal',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Analyze Risk
      </button>
    </div>
  </div>
)}

{/* STEP 3: Results */}
{step === 3 && (
  <div>
    <h2>Risk Analysis Results</h2>
    
    {(() => {
      const analysis = calculateRisk();
      
      return (
        <div>
          {/* Risk Level Badge */}
          <div style={{
            backgroundColor: analysis.riskColor,
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{ margin: 0, fontSize: '48px' }}>{analysis.riskLevel}</h1>
            <p style={{ margin: '10px 0 0 0', fontSize: '18px' }}>
              Risk Score: {analysis.score}
            </p>
          </div>

          {/* Findings */}
          <div style={{ marginBottom: '30px', color:'steelblue' }}>
            <h3>Key Findings:</h3>
            {analysis.findings.length > 0 ? (
              <ul>
                {analysis.findings.map((finding, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    {finding}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No significant abnormalities detected.</p>
            )}
          </div>

          {/* Recommendation */}
          <div style={{
            backgroundColor: '#f8f9fa',
            color: 'black',
            padding: '22px',
            borderRadius: '8px',
            borderLeft: `4px solid ${analysis.riskColor}`
          }}>
            <h3>Recommendation:</h3>
            <p>{analysis.recommendation}</p>
          </div>

          {/* Your Input Summary */}
          <details style={{ marginTop: '30px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', backgroundColor:'teal'}}>
              View Your Input Data
            </summary>
            <div style={{ marginTop: '15px', backgroundColor: 'silver', padding: '15px', borderRadius: '4px' }}>
              <h4>Blood Tests:</h4>
              <p>Ceruloplasmin: {bloodTests.ceruloplasmin || 'Not provided'} mg/dL</p>
              <p>Serum Copper: {bloodTests.serumCopper || 'Not provided'} μg/dL</p>
              <p>24h Urine Copper: {bloodTests.urineCopper || 'Not provided'} μg/day</p>
              <p>ALT: {bloodTests.alt || 'Not provided'} U/L</p>
              <p>AST: {bloodTests.ast || 'Not provided'} U/L</p>
              
              <h4>Symptoms ({symptoms.length}):</h4>
              <p>{symptoms.length > 0 ? symptoms.join(', ') : 'None selected'}</p>
            </div>
          </details>

          {/* Action Buttons */}
          <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => {
                setStep(1);
                setBloodTests({
                  ceruloplasmin: '',
                  serumCopper: '',
                  urineCopper: '',
                  alt: '',
                  ast: ''
                });
                setSymptoms([]);
              }}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Start New Analysis
            </button>
          </div>
        </div>
      );
    })()}
  </div>
)}
    </div>
  );
}

export default App;