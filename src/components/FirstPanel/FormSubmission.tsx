import React, { useRef, useState } from 'react'
import RuleComponent from './RuleComponent'
import {IoIosAdd} from 'react-icons/io'
const FormSubmission = ({handleSubmission} : any) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        specialGroup: false,
        rules: [{ Revenue: '', fieldOption: '', operatorOption:'' }],
    });
    const [error, setError] = useState(false)
    const ruleComponentRef = useRef<any>(null);
    const [word,setWord] = useState(0)
    const handleSubmit = (e: any) => {
        setError(false)
        e.preventDefault();
        const isFormValid = validateFormData(formData);
        if (isFormValid) {
            handleSubmission(formData);
            handleReset()
            handleReset()
        } else {
            setError(true)
        }
    };

    const validateFormData = (formData: any) => {
        const { name, description, rules } = formData;
      
        // Check if all the required fields are filled
        if (!name || !description || rules.some((rule: any) => !rule.fieldOption || !rule.operatorOption)) {
          return false;
        }
      
        return true;
    };
      
    const handleReset = () =>{
        setWord(0)
        setFormData({
            name: '',
            description: '',
            specialGroup: false,
            rules: [{ Revenue: '', fieldOption: '' , operatorOption:''}],
        })
        if (ruleComponentRef && ruleComponentRef.current) {
            // Call the resetState function on the RuleComponent
            ruleComponentRef.current.resetState();
        }
    }

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
      };
    
    const handleAddRule = () => {
        setFormData((prevFormData : any) => ({
          ...prevFormData,
          rules: [...prevFormData.rules, { Revenue: '', fieldOption: '' }],
        }));
      };
    
    const handleDeleteRule = (index:any) => {
        setFormData((prevFormData) => {
          const newRules = [...prevFormData.rules];
          newRules.splice(index, 1);
          return { ...prevFormData, rules: newRules };
        });
      };
    
    const handleRuleChange = (e:any, index:any) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
          const newRules : any= [...prevFormData.rules];
          newRules[index] = { ...newRules[index], [name]: value };
          return { ...prevFormData, rules: newRules };
        });
    };

    const wordCounter=(event:any)=>{
        setWord(event.target.value.length)
    }

  return (
    <>

    <div className="py-8 px-4 mx-auto lg:py-4">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Create Revenue Group</h2>
      <div >
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Name</label>
                  <input type="text" onChange={handleChange}  value={formData.name} name="name" id="name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" />
              </div>
              <div className="sm:col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Group Description</label>
                  <textarea id="description" onKeyUp={wordCounter} onChange={handleChange}  name="description"  value={formData.description} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add description">
         
                  </textarea>
                  <div className='text-xs relative float-right -top-5 right-4'>{word}/ 2000</div>
              </div>
              <div className="sm:col-span-2">
                <input id="default-checkbox" onChange={handleChange} name='specialGroup' checked={formData.specialGroup} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Special group</label>
              </div>
              <div className="sm:col-span-2 mt-6">
                <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Rules</h2>
                        <button 
                        onClick={handleAddRule}
                        className="bg-gray-100 py-1 px-4 mr-2 mb-2 text-sm font-medium text-blue-700 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">
                            <IoIosAdd className='w-6 h-6'/>
                            Add
                        </button>
                    </div>
                    {formData.rules.map((item, index)=>{
                        return (
                            <div key={index} className='flex w-full mt-6'>
                                <RuleComponent key={index} handleDeleteRule={handleDeleteRule} handleRuleChange={handleRuleChange} index={index} ref={ruleComponentRef} />
                            </div>
                        )
                    })}

                    
                </div>
              </div>
          </div>
          {error ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-4" role="alert">
                    <span className="font-medium">Error alert!</span> Please Ensure all Fields are filled in and try submitting again.
            </div>
          ) : null}

          <div className='flex justify-end w-full gap-2 mt-6'>
            <button 
                onClick={handleReset}
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"'>Reset</button>
            <button 
                onClick={handleSubmit}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Submit</button>
        </div>
      </div>

    </div>
    </>
  )
}

export default FormSubmission