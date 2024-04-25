import { useState } from 'react'
import {v4} from 'uuid'
import './index.css'

const DynamicForm = () =>{
    const [inputType, setInputType] = useState('none')
    const [labelText, setLabelText] = useState('')
    const [form, setForm] = useState([])
    const [optionVal, setOptionVal] = useState('')
    const [options, setOptions] = useState([])
    const [isLabelEmpty , setLabelStatus] = useState(true)
    const [isOptionEmpty, setOptionEmptyStatus] = useState(true)
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
            const newData = {id, label: labelText, type: inputType, options: [...options]}
            
            setForm(prev=>([...prev, newData]))
            setLabelText('')   
            setOptions([])
            setOptionVal('')
            setSubmitStatus(true)
            setLabelStatus(true)
        } 
              
    }

    const onFormSubmit = (event) =>{
        event.preventDefault()        
        console.log(form)
        setForm([])
        setSubmitStatus(false)
        setLabelStatus(true)   

    }

    const AddingOptions = () => {
        if (options.length === 0){
            setOptionEmptyStatus(false)
             
        }
        if (optionVal !== ''){
                setOptions([...options, optionVal]);
                setOptionEmptyStatus(true)
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
            {isLabelEmpty === false && <p className='err-msg'> * Label required </p>}
            <button onClick={addToForm}> Add to Form </button>         
            </>            
            }
            {(inputType === 'radio' || inputType === 'select' || inputType === 'checkbox')&& 
            <>
            <label htmlFor='labelText'> Enter Label </label> <br/>
            {isLabelEmpty === false && <p className='err-msg'> * required </p>}
            <input id='labelText' value={labelText} type='text' onChange={(event)=>{setLabelText(event.target.value), setLabelStatus(true)}}  /> <br/>
            
            <label> Add Options  </label> <br/>
            <input type='text' value={optionVal}  onChange={(e)=>{setOptionVal(e.target.value), setOptionEmptyStatus(true)}}/>
            
            <button onClick={AddingOptions} > Add Choices  </button> <br/>
            {isOptionEmpty === false && <p className='err-msg'> * at least one option required </p>}
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
                        <> <label htmlFor={eachItem.label} > {eachItem.label} </label> <br/>
                        <input id={eachItem.label} required type={eachItem.type} /> <br/> </>
                    }

                    {
                        (eachItem.type === 'textarea') &&
                        <> <label> {eachItem.label} </label> <br/>
                         <textarea rows='8' cols='50' required>  </textarea> <br/> </>
                    } 
                    
                    {
                        (eachItem.type==='radio' || eachItem.type==='checkbox') &&
                        <>
                            <label> {eachItem.label}</label> <br/>
                            {eachItem.options.map(eachValue=><> <input required name={eachItem.label} id={eachValue} type={eachItem.type}/> <label htmlFor={eachValue}> {eachValue} </label>  </>)} <br/>
                        </>
                    }
                    {
                        (eachItem.type==='select') &&
                        <>
                            <label> {eachItem.label}</label> <br/>
                            <select onChange={(e)=> setUserText(e.target.value)}>
                            {eachItem.options.map(eachValue=> <option value={eachValue}> {eachValue} </option>)} 
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