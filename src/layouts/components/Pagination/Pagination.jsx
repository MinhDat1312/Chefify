import { Button } from 'react-bootstrap';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';

const Pagination = ({ list, perPage, currentPage, setCurrentPage, scrollRef }) => {
    const handleChangePage = (page) => {
        setCurrentPage(page);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleNextPage = () => {
        if (currentPage + 1 > Math.ceil(list.length / perPage)) {
            setCurrentPage(1);
        } else {
            setCurrentPage((prev) => prev + 1);
        }
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handlePrevPage = () => {
        if (currentPage - 1 <= 0) {
            setCurrentPage(Math.ceil(list.length / perPage));
        } else {
            setCurrentPage((prev) => prev - 1);
        }
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="d-flex gap-3 justify-content-end mt-3">
            <div onClick={handlePrevPage} className="d-flex justify-content-center align-items-center">
                <FaLessThan style={{ color: '#62676d', cursor: 'pointer' }} />
            </div>
            {[...Array(Math.ceil(list.length / perPage))].map((_, index) => (
                <Button
                    key={index}
                    variant="outline-none"
                    className="fw-medium"
                    style={
                        currentPage === index + 1
                            ? {
                                  backgroundColor: '#f24c86',
                                  color: '#ffffff',
                                  border: '2px solid #f24c86',
                              }
                            : {
                                  backgroundColor: 'transparent',
                                  color: '#e0e1e6',
                                  border: '2px solid #e0e1e6',
                              }
                    }
                    onClick={() => handleChangePage(index + 1)}
                >
                    {index + 1}
                </Button>
            ))}
            <div onClick={handleNextPage} className="d-flex justify-content-center align-items-center">
                <FaGreaterThan style={{ color: '#62676d', cursor: 'pointer' }} />
            </div>
        </div>
    );
};

export default Pagination;
