import styles from './InputFloating.module.scss';

const InputFloating = ({ type, id, placeholder, labelName, value, change }) => {
    if (id == 'emailSignup') id = 'email';
    else if (id == 'passwordSignup') id = 'password';

    return (
        <div className={styles.input_container}>
            <input
                type={type}
                id={id}
                autoComplete="off"
                placeholder={placeholder}
                required
                className={styles.text_input}
                name={id}
                value={value}
                onChange={change}
            />
            <label htmlFor={id} className={styles.label}>
                {labelName}
            </label>
        </div>
    );
};

export default InputFloating;
