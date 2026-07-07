import { TextInput } from './TextInput';

export function MemoInput({
    value,
    className,
    onChange,
}: {
    value: string;
    className?: string;
    onChange: (value: string) => void;
}) {
    return (
        <TextInput className={className} label="Memo (optional)" value={value} placeholder="Memo" onChange={onChange} />
    );
}
