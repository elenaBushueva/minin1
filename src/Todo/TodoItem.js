import React, {useContext} from 'react';
import PropTypes from "prop-types";
import Context from "../context";

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

const TodoItem = ({todo, index, onChange}) => {

    const { removeTodo } = useContext(Context);

    return (
        <li style={styles.li}>
            <span className={(todo.completed ? 'done' : {})}>
                <input type="checkbox"
                       style={styles.input}
                       onChange={() => onChange(todo.id)}
                       checked={todo.completed}
                />
            <strong>{index + 1}</strong>
                &nbsp;
                {todo.title}
            </span>

            <button className='rm' onClick={ () => removeTodo(todo.id) }>&times;</button>
        </li>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;