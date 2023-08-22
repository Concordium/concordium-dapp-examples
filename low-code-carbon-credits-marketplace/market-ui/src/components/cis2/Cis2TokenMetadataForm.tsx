import React, { ChangeEvent, FormEvent, useState } from 'react';

import { Button, FormLabel, Stack, TextField } from '@mui/material';

import { Metadata } from '../../models/ProjectNFTClient';

interface TokenMetadataFormProps {
  defaultFormData: Metadata;
  onSubmit: (formData: Metadata) => void;
}

const Cis2TokenMetadataForm: React.FC<TokenMetadataFormProps> = ({ defaultFormData, onSubmit }) => {
  const [formData, setFormData] = useState<Metadata>(defaultFormData);

  const handleAttributeChange = (index: number, value: string) => {
    const updatedAttributes = [...(formData.attributes || [])];
    updatedAttributes[index].value = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      attributes: updatedAttributes,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Perform the form submission or further processing here
    onSubmit(formData);
  };

  const handleFieldChange = (field: keyof Metadata) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: event.target.value,
    }));
  };

  return (
    <Stack spacing={2} component={"form"} onSubmit={handleSubmit}>
      <TextField fullWidth variant="standard" label="Name" value={formData.name} onChange={handleFieldChange("name")} />
      <TextField
        variant="standard"
        label="Description"
        fullWidth
        value={formData.description}
        onChange={handleFieldChange("description")}
      />
      <TextField
        label="Display URL"
        value={formData.display?.url}
        variant="standard"
        fullWidth
        onChange={(event) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            display: { ...prevFormData.display, url: event.target.value },
          }))
        }
      />
      <TextField
        label="Artifact URL"
        value={formData.artifact?.url}
        variant="standard"
        fullWidth
        onChange={(event) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            artifact: { ...prevFormData.artifact, url: event.target.value },
          }))
        }
      />
      <Stack spacing={2}>
        <FormLabel>Attributes</FormLabel>
        {formData.attributes?.map((attribute, index) => (
          <TextField
            fullWidth
            key={index}
            label={attribute.name}
            value={attribute.value}
            onChange={(event) => handleAttributeChange(index, event.target.value)}
            required={attribute.required}
            disabled={attribute.force}
          />
        ))}
      </Stack>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Stack>
  );
};

export default Cis2TokenMetadataForm;
