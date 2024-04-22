import React, { useState } from 'react';
import schoolsoftLogo from '../assets/schoolsoftname.webp';


function QuestionComponent() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch data');
      }

      const data = await response.json();
      setAnswer(data.result);
      setQuestion('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-around ml-96 mt-10 mb-2'>
        <p className="text-gray-500 text-xs">By: Isaac Glifberg</p>
      </div>
      <div className="max-w-xl mx-auto p-10 shadow" aria-live="polite">
        <div className="flex flex-col justify-center items-center h-36 mb-6">
          <img src={schoolsoftLogo} alt="School Soft Name Logo" className="max-w-full max-h-full" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="questionInput" className="font-bold">
            Fråga:
          </label>
          <input
            id="questionInput"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="p-2 border border-gray-300 rounded inputHoverEffect"
            placeholder='Hur uppdaterar man och skickar nytt betygslösenord?'
            aria-disabled={isLoading}
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 buttonHoverEffect" disabled={isLoading}>
            Skicka fråga
          </button>
        </form>
        {isLoading && <p className="text-blue-500 text-center">Laddar...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {answer && (
          <div className="mt-5 p-4 border border-gray-200 rounded bg-gray-50">
            <h2 className="text-blue-500 mb-2">Svar:</h2>
            <p dangerouslySetInnerHTML={{__html: answer.replace(/\n/g, "<br />")}}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionComponent;

