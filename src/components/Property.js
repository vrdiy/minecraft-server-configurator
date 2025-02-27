import './ServerProperties.css';


export function BooleanProperty({name, defaultValue}){
    function reset(){
        const elem = document.getElementById(name);
        elem.checked = defaultValue;
        handleChange();
    }
    function handleChange(){
        const elem = document.getElementById(name);
        if (defaultValue != elem.checked){
            elem.parentElement.classList.add('non-default');
        }
        else{
            elem.parentElement.classList.remove('non-default');
        }  
    }
    return (
        <li className='sProperty'>
            <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                <div className='refresh-img' onClick={reset}></div>
                {name}
            </div>
        <input className='sPropertyField' type='checkbox' id={name} onChange={handleChange} defaultChecked={defaultValue}/>
        </li>
        
    )
}
export function IntegerProperty({name, min, max, defaultValue}){
    function reset(){
        const elem = document.getElementById(name);
        elem.value = defaultValue;
        handleChange();
    }
    function handleChange(){
        const elem = document.getElementById(name);
        if (defaultValue != elem.value){
            elem.parentElement.classList.add('non-default');
        }
        else{
            elem.parentElement.classList.remove('non-default');
        }  
    }
    return (
        <li className='sProperty'>
            

            <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                <div className='refresh-img' onClick={reset}></div>
                {name}
            </div>
        <input className='sPropertyField' type='number' id={name} min={min} max={max} onChange={handleChange}defaultValue={defaultValue}/>
            
        </li>
    )
}
export function StringProperty({name, validityCheck, defaultValue}){
    function reset(){
        const elem = document.getElementById(name);
        elem.value = defaultValue;
        handleChange();
    }
    function handleChange(){
        const elem = document.getElementById(name);
        if (defaultValue != elem.value){
            elem.parentElement.classList.add('non-default');
        }
        else{
            elem.parentElement.classList.remove('non-default');
        }  
        
    }
    return (
        <li className='sProperty'>
            <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                <div className='refresh-img' onClick={reset}></div>
                {name}
            </div>
        <input className='sPropertyField' type='text' id={name} defaultValue={defaultValue} onChange={handleChange}/>
        </li>
    )
}
export function OptionProperty({name, defaultValue, options}){
    const opts = [];
    function reset(){
        const elem = document.getElementById(name);
        elem.value = defaultValue;
        handleChange();
    }
    function handleChange(){
        const elem = document.getElementById(name);
        if (defaultValue != elem.value){
            elem.parentElement.classList.add('non-default');
        }
        else{
            elem.parentElement.classList.remove('non-default');
        }  
    }
    for (let i = 0; i < options.length; i++){
        opts.push(
            <option key={name+'2'+i} value={options[i]}>{options[i]}</option>
        )
    }
    return (
        <li key={name} className='sProperty'>
            <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                <div className='refresh-img' onClick={reset}></div>
                <p key={name+'1'}>{name}</p>
            </div>
        <select key={name+'2'} className='sPropertyField' onChange={handleChange} id={name} defaultValue={defaultValue}>
            {opts}
        </select>
        </li>
    )
}