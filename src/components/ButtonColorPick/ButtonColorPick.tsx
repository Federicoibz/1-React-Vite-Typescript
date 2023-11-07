import {useState} from 'react';
import {Button, Form, Modal}from 'react-bootstrap';

import React from 'react'
import ModalColorPick from '../ModalColorPick/ModalColorPick';

const ButtonColorPick = () => {

    const [buttonColor, setButtonColor] = useState("#3d7c40");

    const [showModal, setShowModal] = useState(false);

    const handleColorChange = (color:string)=>{
        setButtonColor(color);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

  return (
    <div className='m-3'>
        <h2>Ejercicio 3</h2>
        
        {/**comp padre */}
            <Button variant="primary" style={{backgroundColor:buttonColor}}
            onClick={handleShowModal}>cambia color</Button>


        {/**comp hijo */}

        {showModal && <ModalColorPick 
        show= {showModal}
        onHide={()=> setShowModal(false)}
        handleColorChange={handleColorChange}/>}
    </div>
  )
}

export default ButtonColorPick