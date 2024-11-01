import React, { useState } from 'react';

export default function DayCheckbox({ dia, val_ini, onAvailabilityChange }) {
    const [selectedValues, setSelectedValues] = useState(val_ini);

    const handleOnChange = (index) => (e) => {
        const checked = e.target.checked;
        const updatedValues = selectedValues.map((item, i) => {
            if (i === index) {
                return { ...item, disponivel: checked ? '1' : '0' };
            }
            return item;
        });
        setSelectedValues(updatedValues);
        onAvailabilityChange(dia, updatedValues);
    };

    return (
        <div className="col-md-2 mt-3 mb-3">
            <label htmlFor="estado" className="form-label text_f">{dia}</label>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox"
                    onChange={handleOnChange(0)} 
                    id={`checkManha-${dia}`} 
                    checked={selectedValues[0].disponivel === '1'}
                />
                <label className="form-check-label" htmlFor={`checkManha-${dia}`}>Manhã</label>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    onChange={handleOnChange(1)} 
                    id={`checkTarde-${dia}`} 
                    checked={selectedValues[1].disponivel === '1'}
                />
                <label className="form-check-label" htmlFor={`checkTarde-${dia}`}>Tarde</label>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    onChange={handleOnChange(2)} 
                    id={`checkNoite-${dia}`} 
                    checked={selectedValues[2].disponivel === '1'}
                />
                <label className="form-check-label" htmlFor={`checkNoite-${dia}`}>Noite</label>
            </div>
        </div>
    );
}
