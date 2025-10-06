import { useState } from 'react';

const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });

    // Clear error for this field when user makes a selection
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    if (validationSchema) {
      const result = validationSchema(values);
      if (!result.success) {
        setErrors(result.errors);
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSelectChange,
    validate,
    reset,
  };
};

export default useForm;