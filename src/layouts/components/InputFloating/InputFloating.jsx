import styles from './InputFloating.module.scss';

const InputFloating = ({ type, id, placeholder, labelName }) => {
    return (
        <div className={styles.input_container}>
            <input
                type={`${type}`}
                id={`${id}`}
                autoComplete="off"
                placeholder={`${placeholder}`}
                required
                className={styles.text_input}
            />
            <label htmlFor={`${id}`} className={styles.label}>
                {labelName}
            </label>
        </div>
    );
};

export default InputFloating;
