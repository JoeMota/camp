import React from 'react';
import { Box } from '@mui/material';

const LocationInput = ({ onChange, required }) => {
  const handlePlaceSelect = (event) => {
    const place = event.detail.place;
    
    if (place) {
      const coordinates = {
        lat: place.location.lat,
        lng: place.location.lng
      };

      // Extract address components
      let zipCode = '';
      let city = '';
      let state = '';

      place.addressComponents.forEach(component => {
        const types = component.types;
        
        if (types.includes('postal_code')) {
          zipCode = component.longText;
        }
        if (types.includes('locality')) {
          city = component.longText;
        }
        if (types.includes('administrative_area_level_1')) {
          state = component.shortText;
        }
      });

      onChange({
        zip: zipCode,
        city: city,
        state: state,
        coordinates
      });
    }
  };

  return (
    <Box>
      <gmp-place-autocomplete
        placeholder="Search Location"
        required={required}
        ongmp-place-changed={handlePlaceSelect}
        style={{
          width: '100%',
          height: '56px',
          '--gmpx-color-surface': '#ffffff',
          '--gmpx-color-on-surface': '#000000',
          '--gmpx-color-on-surface-variant': '#666666',
          '--gmpx-color-primary': '#2563eb',
          '--gmpx-font-family-base': 'Roboto, sans-serif',
          '--gmpx-font-size-base': '16px'
        }}
      />
    </Box>
  );
};

export default LocationInput; 