import React, {useEffect, useState} from 'react';
import SqlQueryForm from '@/components/SqlQueryForm';

export default function Home() {

  
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <SqlQueryForm />      
    </div>
  )
}
