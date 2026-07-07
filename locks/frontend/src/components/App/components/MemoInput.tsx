import { TextInput } from './TextInput';
import type { UseFormRegisterReturn } from 'react-hook-form';

export function MemoInput({
    value,
    className,
    onChange,
    registration,
}: {
    value?: string;
    className?: string;
    onChange?: (value: string) => void;
    registration?: UseFormRegisterReturn;
}) {
    return (
        <TextInput
            className={className}
            label="Memo (optional)"
            value={value}
            placeholder="Memo"
            onChange={onChange}
            registration={registration}
        />
    );
}
