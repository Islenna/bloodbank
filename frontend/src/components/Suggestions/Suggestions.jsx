import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Suggestions() {
    const [message, setMessage] = useState(''); // State to track the suggestion message

    const user = useAuth();
    const userEmail = user.email;

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            await axios.post('http://localhost:8000/api/suggestion', payload);
            // Handle success
            toast.success('Suggestion sent successfully', {
                autoClose: 3000
            });
            // Clear the input field after successful submission
            setMessage('');
        } catch (error) {
            // Handle error
            toast.error('Failed to send suggestion', {
                autoClose: 3000
            });
        }
    }

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <form onSubmit={handleSubmit}> {/* Form element with onSubmit handler */}
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suggestion Box</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            value={message} // Bind the value to the state
                            onChange={(e) => setMessage(e.target.value)} // Update the state on change
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
