import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

export default function Suggestions() {
    const contactEmail = import.meta.env.VITE_REACT_APP_CONTACT_EMAIL;

    async function handleSubmit() {
        const user = useAuth();
        const userEmail = user.email; // Get the email from your auth context

        const payload = {
            from: userEmail,
            subject: "Your Subject",
            message: "Your Message"
        };

        try {
            await axios.post('YOUR_BACKEND_ENDPOINT', payload);
            // handle success, maybe show a success message
        } catch (error) {
            // handle error, maybe show an error message
        }
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Suggestion Box</label>
                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
