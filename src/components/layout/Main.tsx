import React, { useMemo, useState } from 'react'
import FormSubmission from '../FirstPanel/FormSubmission';
import {FaTrash} from 'react-icons/fa'
import RuleTable from '../FirstPanel/RuleTable';

const Main = () => {

    const [data, setData] = useState<any>([])

    function handleSubmission(payload:any){
        setData((prevData : any) => [...prevData, payload]);
    }
    function handleDelete(index: number) {
        setData((prevData : any) => prevData.filter((_:any, i:any) => i !== index));
    }

  return (
    <>
    <div className="grid gap-8 lg:grid-cols-2 w-full mt-4 mb-4">
        <div className='bg-white border border-gray-300 rounded-lg'>
            <FormSubmission handleSubmission={handleSubmission}></FormSubmission>
        </div>
        <div className='bg-white shadow-sm rounded-lg'>
            <h3 className='font-bold text-lg mb-4'>Browse Revenue Groups</h3>
            {data.map((item:any, index: number)=>{
                return (
                    <div key={index} className='bg-white  rounded-lg border border-gray-300 mb-6'>
                        <div className='flex w-full px-4 py-4'>
                            <div className='flex flex-col'>
                                <div className='flex flex-wrap gap-2'>
                                    <h3 className='font-bold text-md'>Group Name: {item.name}</h3>
                                    {item.specialGroup === true ? (
                                        <span className='px-1 py-1 text-white text-center rounded-full text-xs bg-blue-600'>Special Group</span>
                                    ) : null}
                                </div>
                                <div className='w-3/4'>
                                    <p className='text-sm mt-2'>{item.description}</p>
                                </div>

                            </div>
                            <div className='flex ml-auto'>
                                <button 
                                    onClick={() => handleDelete(index)}
                                className='px-1 h-5 bg-gray-400 rounded-full items-center'>
                                    <FaTrash className='w-3 h-3'/>
                                </button>
                            </div>
                        </div>
                        <div className='flex '>
                            <RuleTable data={item.rules} rowIndex={index} />
                        </div>
                    </div>

                )
            })}


        </div>
    </div>  
    </>

  )
}

export default Main