import './Buttons.css'

export function Button({id,label, inputType, callBack}){
    return (
        <input id={id}onChange={callBack} type={inputType}/>
    )
}
export function ImportButton({importFunction,id}){
    return(
        <div>
            <label id={`${id}-label`}htmlFor={`${id}`}  className='fileInputLabels importButtonLabel'>Import</label>
            <input id={`${id}`} style={{display:'none'}} onChange={importFunction} type="file" />
        </div>
    )
}
export function ExportButton({exportFunction,id}){
    return(
        <div >
            <label id={`${id}-label`}htmlFor={`${id}`} className='fileInputLabels exportButtonLabel'>Export</label>
            <input id={`${id}`} style={{display:'none'}} onClick={exportFunction}/>
        </div>
    )
}