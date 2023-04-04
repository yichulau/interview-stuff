import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import {GrAddCircle} from 'react-icons/gr'
import {AiOutlineClose, AiOutlineMinusCircle} from 'react-icons/ai'

const RuleComponent = forwardRef(function RuleComponent({handleDeleteRule, handleRuleChange , index} : any, ref) {
    const [selectedFieldOption, setSelectedFieldOption] = useState('');
    const [selectedOperatorOption, setSelectedOperatorOption] = useState('');
    const [revenue, setRevenue] = useState(0)
    const [parameters, setParameters] = useState([{
        parameter:'',
    }]);

    const ruleComponentRef = useRef(null);
    useImperativeHandle(ref, () => ({
        resetState() {
          setSelectedFieldOption('');
          setSelectedOperatorOption('');
          setRevenue(0);
          setParameters([{ parameter: '' }]);
        }
    }));


    function handleSelectFieldChange(event :any) {
        const { name, value } = event.target;
        setSelectedFieldOption(value);
        handleRuleChange({ target: { name, value } }, index);
    }

    function handleSelectOperatorChange(event :any) {
        const { name, value } = event.target;
        setSelectedOperatorOption(value);
        handleRuleChange({ target: { name, value } }, index);
    }

    function handleAmountChange(event :any) {
        const { name, value } = event.target;
        setRevenue(value);
        handleRuleChange({ target: { name, value } }, index);
    }

    function handleAddParameter() {
        setParameters([...parameters, { parameter: '' }]);
    }


    function handleDeleteParameter(paramIndex: any) {
        const newParameters = [...parameters];
        newParameters.splice(paramIndex, 1);
        setParameters(newParameters);
        handleRuleChange({ target: { name: 'parameters', value: newParameters } }, index);
    }

    function handleChangeParameter(event: any, paramIndex: any) {

        const { value } = event.target;
        const newParameters = [...parameters];
        newParameters[paramIndex] = { parameter: value };
        setParameters(newParameters);
        handleRuleChange({ target: { name: 'parameters', value: newParameters } }, index);
    }

    const fieldOption = [
        {id: 0, value: 0, text: 'afff_sub1'},
        {id: 1, value: 1, text: 'afff_sub2'},
        {id: 2, value: 2, text: 'afff_sub3'},
        {id: 3, value: 3, text: 'afff_sub4'},
    ]

    const operatorOption = [
        {id: 0, value: 0, text: 'is'},
        {id: 1, value: 1, text: 'is not'},
        {id: 2, value: 2, text: 'starts with'},
        {id: 3, value: 3, text: 'ends with'},
        {id: 4, value: 4, text: 'containes'},
        {id: 5, value: 5, text: 'doesnt contains'},
    ]

  return (
    <>
        <div className='bg-white rounded-lg border border-dashed w-full'>
            <div className='px-2 py-2'>
                <div className='flex justify-between items-center'>
                    <h4 className='font-bold'>Rule {index + 1}</h4>
                    <button disabled={index===0} className='cursor-pointer' onClick={handleDeleteRule}><AiOutlineClose /></button>
                </div>
                <div className='bg-red-100 px-2 py-2 mt-4 rounded-md'>
                    <div className='flex gap-4 items-start w-full'>
                        <div className='flex items-center gap-2 w-full'>
                            <p>If</p>
                            <select name='fieldOption' value={selectedFieldOption} onChange={handleSelectFieldChange} className="bg-white border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Select field</option>
                                {fieldOption.map((item)=> {
                                    return (
                                        <option key={item.id} value={item.text}>{item.text}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='flex items-center gap-2 w-full'>
                            <select name='operatorOption' value={selectedOperatorOption} onChange={handleSelectOperatorChange} className="bg-white border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                <option selected>Select Operator</option>
                                {operatorOption.map((item)=> {
                                    return (
                                        <option key={item.id} value={item.text}>{item.text}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='flex flex-col items-center gap-2 w-full'>
                            {parameters.map((parameter, index) => (
                                <div key={index} className='flex items-center justify-center gap-2'>
                                    <input
                                        type='text'
                                        value={parameter.parameter}
                                        onChange={(event) => handleChangeParameter(event, index)}
                                        className='placeholder-black block w-full p-2 text-black border bg-white rounded-md sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                        placeholder='Enter Parameter'
                                    />
                                    {/* @ts-ignore */}
                                     {index > 0 ? (
                                        <AiOutlineMinusCircle className='w-5 h-5' onClick={() => handleDeleteParameter(index)} />
                                    ): (
                                    <div className='flex items-center justify-center gap-2'>
                                        <GrAddCircle onClick={handleAddParameter} />
                                    </div>
                                    )}
       
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className='flex items-center mt-2 gap-2'>
                    <div className='text-xs'> then revenue is </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <p>%</p>
                        </div>
                        <input type="number" 
                            name='Revenue'
                            onChange={handleAmountChange}
                            value={revenue}
                        id="Revenue" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Amount"/>
                    </div>
                </div>
            </div>
      
        </div>
    </>
  )
})

export default RuleComponent