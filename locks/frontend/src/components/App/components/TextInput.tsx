import { Form } from 'react-bootstrap';

export function TextInput({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    disabled,
    min,
    className,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    min?: string;
    className?: string;
}) {
    return (
        <Form.Group className={`mb-3 ${className}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                onChange={(event) => onChange(event.target.value)}
            />
        </Form.Group>
    );
}
