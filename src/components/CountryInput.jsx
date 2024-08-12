export default function CountryInputBox({ title, type, value, onChange }) {
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