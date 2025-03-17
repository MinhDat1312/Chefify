import styles from './CheckBox.module.scss';

const CheckBox = ({ type, id }) => {
    return (
        <div className={styles.form_check}>
            <input type={`${type}`} id={`${id}`} className={styles.form_check_input} />
        </div>
    );
};

export default CheckBox;
