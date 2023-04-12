import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, {useEffect, useState} from 'react';
import { parse } from 'postcss';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [query, setQuery] = useState('');

  const [queryResults, setQueryResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query
      }),
    };

    const resp = await fetch('http://localhost:3005/runQuery', reqOptions);

    const parsedResp = await resp.json();

    setQueryResults(parsedResp);
  }
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <form className='flex flex-col w-2/5 border border-black rounded-md items-center'>
        <label htmlFor='query'>Sql Query</label>
        <input
          name='query'
          type='text'
          onChange={handleChange}
          value={query}
          className='border border-black pl-1 w-[95%]'
        />
        <button onClick={handleSubmit}>Run Query</button>
      </form>
    </div>
  )
}
