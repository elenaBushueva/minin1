import React, {useState} from 'react';
import PropTypes from "prop-types";


const useInputValue = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue);
    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

const AddTodo = ({onCreate}) => {
    const input = useInputValue('');
    const submitHandler = (event) => {
        event.preventDefault();
        if (input.value().trim()) {
            onCreate(input.value());
            input.clear()
        }
    }

    return (
        <div>
            <form style={{marginBottom: '1rem'}} onSubmit={submitHandler}>
                <input {...input.bind} />
                <button type="submit">Add todo</button>
            </form>
        </div>
    );
};

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;