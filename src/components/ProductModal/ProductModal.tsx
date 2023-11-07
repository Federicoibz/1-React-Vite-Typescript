import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { Product } from "../../types/Product";

//dependencias para validar forms
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductService } from "../../services/ProductService";

//notificaciones al usuario
import { toast } from "react-toastify";


type ProductModalProps = {
    show: boolean;
    onHide:() => void;
    title: string;
    modalType: ModalType;
    prod: Product;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductModal = ({show, onHide, title, modalType, prod, refreshData}:ProductModalProps) => {
    

    //create - update
const handleSaveUpdate = async(prod:Product)=>{
    try {
        const isNew = prod.id ===0;
        if (isNew) {
            await ProductService.createProduct(prod);
        } else { 
            await ProductService.updateProduct(prod.id, prod)
        } 
        toast.success(isNew ? "Creado": "Actualizado",{
            position:"top-center",
        })
        onHide();
        refreshData(prevState => !prevState);
    } catch (error) {
        console.error(error);
        toast.error("hay un error")
    }
};

    //DELETE
    const handleDelete = async ()=>{
        try {
            await ProductService.deleteProduct(prod.id);
            toast.success("producto eliminado"),
            {position:"top-center"}
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("hay un error");
        }
    }

    //yup
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            title: Yup.string().required('El titulo es requerido'),
            price: Yup.number().min(0).required('El precio es requerido'),
            description: Yup.string().required('El descripcion es requerido'),
            category: Yup.string().required('El categoria es requerido'),
            image: Yup.string().required('El imagen es requerido')
        });
    };
    //formik
    const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj:Product) => handleSaveUpdate(obj),

    });
    
    return (
    <>
    {modalType === ModalType.DELETE ? (
        <>
        <Modal show onHide={onHide} centered backdrop="static">
            <Modal.Header>
                <Modal.Title> {title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>estas seguro de eliminar el prducto?<br/>
                <strong>{prod.title}</strong></p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
            </Modal.Footer>

        </Modal>
        </>
    ):(
        <>
            <Modal show = {show} onHide = {onHide} centered backdrop="static"
            className="modal-xl">
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {"Formulario"}
                    <Form onSubmit={formik.handleSubmit}>

                        {"titulo"}
                        <Form.Group controlId="formTitulo">
                            <Form.Label> Titulo</Form.Label>
                            <Form.Control 
                                name="title"
                                type="text"
                                value={formik.values.title || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.title && formik.touched.title)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.title}
                            </Form.Control.Feedback>
                        </Form.Group> 

                        {"precio"}
                        <Form.Group controlId="formPrecio">
                            <Form.Label> Precio</Form.Label>
                            <Form.Control 
                                name="title"
                                type="number"
                                value={formik.values.price || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.price && formik.touched.price)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {"descripcion"}
                        <Form.Group controlId="formDescription">
                            <Form.Label> Descripcion</Form.Label>
                            <Form.Control 
                                name="title"
                                type="text"
                                value={formik.values.description || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.description && formik.touched.description)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {"categoria"}
                        <Form.Group controlId="formCatecory">
                            <Form.Label> categoria</Form.Label>
                            <Form.Control 
                                name="title"
                                type="text"
                                value={formik.values.category || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.category && formik.touched.category)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {"imagen"}
                        <Form.Group controlId="formImage">
                            <Form.Label> imagen</Form.Label>
                            <Form.Control 
                                name="title"
                                type="text"
                                value={formik.values.image || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={Boolean(formik.errors.image && formik.touched.image)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Modal.Footer className="mt-4">
                            <Button variant="secondary" onClick={onHide}>cancelar</Button>
                            <Button variant="primary" type="submit" disabled={!formik.isValid}>guardAR</Button>
                        </Modal.Footer>

                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )}

    </>
  )
}

export default ProductModal