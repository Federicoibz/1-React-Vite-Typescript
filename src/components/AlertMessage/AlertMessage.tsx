import {useState} from 'react'
import AlertGenerator from '../AlertGenerator/AlertGenerator';

const AlertMessage = () => {
    //guarva valor campo de texto
    const[inputValue, setInputValue] = useState('');

    //guarda el mensage
    const[message, setMessage]= useState('');
  
    //muestra el componente hijo segun el estado
    const[showAlert, setShowAlert]= useState(false);
    
    //si el campo de texto no esta vacio se guarda y se renderiza
    const handleClick = () => {
        if(inputValue.trim() !== ''){
            setShowAlert(true);
            setMessage(inputValue);
        } else{
            setShowAlert(false)
        }
    }
    
    return (
    <div className='m-3'>
        <h2>Ej2</h2>

        {/**componente padre */}
        <input type='text' value={inputValue} onChange={(e) =>
        setInputValue(e.target.value)}/>

        <button onClick={handleClick}>Enviar</button>

        {/**componente hijo */}
        {showAlert && <AlertGenerator message= {message}/>}
    </div>
  )
}

export default AlertMessage         