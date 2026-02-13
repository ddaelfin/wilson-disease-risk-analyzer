import { useState } from 'react';

export function BloodTestForm({ onSubmit}) {
    const [values, setValues] = useState({
        ceruloplasmin: '',
        serumCopper: '',
        urineCopper24h: '',
        alt: '',
        ast: ''
    })


const handleChange = (field,value) => {
    setValues({
        ...values,
        [field]: value
    })    
}

const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values)
}

return (
    <form onSubmit={handleSubmit}>
        <h2>Blood Test Results</h2>

        <div>
            <label>Ceruloplasmin (mg/dL):
                <input
                    type="number"
                    value={values.ceruloplasmin}
                    onChange={(e) => handleChange('ceruloplasmin', e.target.value)}
                    placeholder="Normal: 20-40"
                />
            </label>
        </div>

        <div>
            <label>24h Urine Copper (μg/day)</label>
            <input
                type="number"
                value={values.urineCopper24h}
                onChange={(e)=> handleChange('urineCopper24h', e.tardet.value)}
                placeholder="Normal: <40"
            />
        </div>

        <div>
            <label>ALT (U/L):</label>
            <input 
                 type="number"
                 value={values.alt}
                 onChange={(e)=> handleChange('alt', e.target.value)}
                 placeholder="Normal: 7-56"

            />
        </div>

        <div>
            <label>AST (U/L):</label>
            <input
                type="number"
                value={values.ast}
                onChange={(e) => handleChange('ast', e.target.value)}
                placeholder="Normal: 10-40"
            />
        </div>
        <button type="submit">Analyze Results</button>
    </form>
)
}