import Spinner from 'react-bootstrap/Spinner';


const Loader = () => {
  return (
    <div>
    <Spinner animation="border" variant="info" className='loader-spinner'>
    <span className="visually-hidden">Loading...</span>
  </Spinner>    
    </div>
    
  );
}

export default Loader