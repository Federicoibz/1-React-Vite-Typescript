import {Alert} from 'react-bootstrap'
//se especifica cuales son los props y el tipo de dato que el componente hijo puede recibir
type AlertGeneratorProps = {
    message: string;
}

// el compornende hijo tuene argumentos de "alertgeneratorProps"
const AlertGenerator = ({message}:AlertGeneratorProps) => {
    return (
    <Alert variant= "success" className='mt-2 w-25'>
        <Alert.Heading>mssge resibido</Alert.Heading>
        <p>
            {message}
        </p>
    </Alert>
    )
}

export default AlertGenerator