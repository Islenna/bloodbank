import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Form({ formConfig, initialData }) {
    const [formData, setFormData] = useState(initialData || {});
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    useEffect(() => {
        // If editing, fetch the initial data
        if (id && !initialData) {
            axios.get(`${formConfig.apiEndpoint}/${id}`, { withCredentials: true })
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((err) => console.error('Error fetching data:', err));
        }
    }, [formConfig.apiEndpoint, id, initialData]);

    const validateForm = () => {
        const errors = {};
        formConfig.fields.forEach(field => {
            if (field.required && !formData[field.name]) {
                errors[field.name] = `${field.label} is required`;
            }
            if (field.validation && !field.validation(formData[field.name])) {
                errors[field.name] = field.errorMessage;
            }
        });

        setFormErrors(errors);
        return Object.values(errors).every(error => !error);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        try {
            if (id) {
                await axios.put(`${formConfig.apiEndpoint}/${id}`, formData, { withCredentials: true });
                toast.success(capitalizeFirstLetter(`${formConfig.type} updated successfully`));
            } else {
                await axios.post(formConfig.apiEndpoint, formData, { withCredentials: true });
                toast.success(capitalizeFirstLetter(`${formConfig.type} added successfully`));


            }
            navigate(`/${formConfig.type}`);
        } catch (err) {
            console.error('Error:', err);
            toast.error(`Failed to ${id ? 'update' : 'add'} ${formConfig.type}`);
        }
    };

    return (
        <div>
            <div className="text-center">
                <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                    <form onSubmit={handleSubmit}>
                        {formConfig.fields.map(field => (
                            <div className="mb-6" key={field.name}>
                                <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    {field.label}:
                                </label>
                                {field.type === 'select' ? (
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder={field.placeholder}
                                    />
                                )}
                                {formErrors[field.name] && <div className="text-danger">{formErrors[field.name]}</div>}
                            </div>
                        ))}
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {id ? 'Update' : 'Create'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Form;
