import { Button, Form } from 'react-bootstrap';

export function RepeatableTextList({
    label,
    values,
    onChange,
    disabled,
    placeholder,
}: {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    disabled?: boolean;
    placeholder?: string;
}) {
    const updateAt = (index: number, value: string) => {
        onChange(values.map((current, currentIndex) => (currentIndex === index ? value : current)));
    };

    const removeAt = (index: number) => {
        onChange(values.length === 1 ? [''] : values.filter((_, currentIndex) => currentIndex !== index));
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <div className="repeatable-list">
                {values.map((value, index) => (
                    <div key={index} className="repeatable-row">
                        <Form.Control
                            value={value}
                            placeholder={placeholder}
                            disabled={disabled}
                            onChange={(event) => updateAt(index, event.target.value)}
                        />
                        <Button
                            type="button"
                            variant="outline-secondary"
                            disabled={disabled}
                            onClick={() => onChange([...values, ''])}
                        >
                            +
                        </Button>
                        <Button
                            type="button"
                            variant="outline-secondary"
                            disabled={disabled}
                            onClick={() => removeAt(index)}
                        >
                            -
                        </Button>
                    </div>
                ))}
            </div>
        </Form.Group>
    );
}
