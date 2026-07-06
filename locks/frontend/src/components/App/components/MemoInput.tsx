import { TextInput } from './TextInput';

export function MemoInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return <TextInput label="Memo" value={value} placeholder="Optional memo" onChange={onChange} />;
}
