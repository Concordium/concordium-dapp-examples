import { Form } from 'react-bootstrap';
import type { UseFormRegisterReturn } from 'react-hook-form';

export function TextInput({
    label,
    value,
    onChange,
    registration,
    error,
    placeholder,
    type = 'text',
    disabled,
    min,
    className,
}: {
    label: string;
    value?: string;
    onChange?: (value: string) => void;
    registration?: UseFormRegisterReturn;
    error?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    min?: string;
    className?: string;
}) {
    return (
        <Form.Group className={`mb-3 ${className ?? ''}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...(registration ?? {})}
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                isInvalid={Boolean(error)}
                onChange={onChange ? (event) => onChange(event.target.value) : registration?.onChange}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}
