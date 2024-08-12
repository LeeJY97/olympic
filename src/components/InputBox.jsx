function DivInputBox({ children, className = [] }) {
    const stringClassName = className.join(' ')
    return (
        <div className={stringClassName}>
            {children}
        </div>
    )
}

function FormInput({ title, type, value, onChange }) {
    return (
        <>
            <p>{title}</p>
            <input
                type={type}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export { DivInputBox, FormInput }

