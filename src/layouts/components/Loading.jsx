import { Modal, Spinner } from 'react-bootstrap';

const Loading = ({ loading }) => {
    return (
        <Modal show={loading} centered>
            <Modal.Body>
                <div className="mt-3 text-center">
                    <Spinner animation="border" />
                    <p>Waiting a second....</p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Loading;
