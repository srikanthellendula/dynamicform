import { useState } from 'react'
import {v4} from 'uuid'
import './index.css'

const DynamicForm = () =>{
    const [inputType, setInputType] = useState('none')
    const [labelText, setLabelText] = useState('')
    const [formData, setFormData] = useState({})
    const [form, setForm] = useState([])
    const [optionVal, setOptionVal] = useState('')
    const [options, setOptions] = useState([])
    const [isLabelEmpty , setLabelStatus] = useState(true) 
    const [isSubmitted, setSubmitStatus] = useState(false)
     

    

    const addToForm = () =>{
        if(labelText === ''){
            setLabelStatus(false)

        }

        if (options.length === 0){
            setLabelStatus(false)
             
        }

        if(labelText!==''){
            const id = v4()
            setFormData({id, label: labelText, type: inputType, options: [...options]})
            setForm(prev=>([...prev, formData]))
            setLabelText('')   
            setOptions([])
            setSubmitStatus(true)
        } 
              
    }

    const onFormSubmit = (event) =>{
        event.preventDefault()
        console.log(form)
        setForm([])
        setSubmitStatus(false)
         

    }

   const AddingOPtions = () => {

    if (optionVal !== ''){
        setOptions([...options, optionVal]);
    setOptionVal('')
    }
    
   }
 
    return(
        <div className='main-cont'>
            <div> 
            <h1> React Dynamic Forms</h1>
                <select onChange={(e)=>{setInputType(e.target.value)}} >
                <option value="none"> Select From Type</option>
                <option value='text'> Text </option>
                <option value='number' > Number  </option>
                <option value='textarea'> Textarea</option>
                <option value='select'> Dropdown </option>
                <option value='checkbox'> Check Box </option>
                <option value='radio'> Radio </option>
            </select> <br/>
        {inputType!=='none' &&
            <> 
            {(inputType === 'text' || inputType === 'number' || inputType==='textarea')&& 
            <>
            <label htmlFor='labelText'> Enter Label </label> <br/>            
            <input id='labelText' value={labelText} type='text' onChange={(event)=>{setLabelText(event.target.value), setLabelStatus(true)}}  />  <br/> 
            {/* {isLabelEmpty === false && <p className='err-msg'> * Label not to be empty </p>} */}
            <button onClick={addToForm}> Add to Form </button>         
            </>            
            }
            {(inputType === 'radio' || inputType === 'select' || inputType === 'checkbox')&& 
            <>
            <label htmlFor='labelText'> Enter Label </label> <br/>
            <input id='labelText' value={labelText} type='text' onChange={(event)=>{setLabelText(event.target.value), setLabelStatus(true)}}  /> <br/>
            {/* {isLabelEmpty === false && <p className='err-msg'> * Label not to be empty </p>} */}
            <label> Add Options  </label> <br/>
            <input type='text' value={optionVal}  onChange={(e)=>setOptionVal(e.target.value)}/>
            
            <button onClick={AddingOPtions} > Add Choices  </button> <br/>
            {options.map(eachItem=> <li key={v4()} > {eachItem} </li>)}
            <button onClick={addToForm}> Add to Form </button>         
            </>            
            } 


            </>
            
        }
        <br/>
        </div>
        <div className='form'> 
         
            <form onSubmit={onFormSubmit}>
                    {form.map(eachItem=><div  key={v4()}> 
                    {  
                        (eachItem.type === 'text' || eachItem.type === 'number') &&
                        <> <label> {eachItem.label} </label> <br/>
                        <input required type={eachItem.type}/> <br/> </>
                    }

                    {
                        (eachItem.type === 'textarea') &&
                        <> <label> {eachItem.label} </label> <br/>
                         <textarea rows='8' cols='50' >  </textarea> <br/> </>
                    } 
                    
                    {
                        (eachItem.type==='radio' || eachItem.type==='checkbox') &&
                        <>
                            <label> {eachItem.label}</label> <br/>
                            {eachItem.options.map(eachValue=><> <input onChange={(event)=>{setFinalValue(event.target.value)}} name={eachItem.label} id={eachValue} type={eachItem.type}/> <label htmlFor={eachValue}> {eachValue} </label>  </>)} <br/>
                        </>
                    }
                    {
                        (eachItem.type==='select') &&
                        <>
                            <label> {eachItem.label}</label> <br/>
                            <select>
                            {eachItem.options.map(eachValue=> <option> {eachValue} </option>)} 
                            </select> <br/>
                            
                        </>

                    }            
                    
                </div>)}  
            {isSubmitted && <input type='submit' value='Submit'/>   }
              
                    
            </form>
    </div>
        </div>
    )

}

export default DynamicForm