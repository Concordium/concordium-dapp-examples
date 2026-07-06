import { Form } from 'react-bootstrap';

import { operationTitle } from '../utils';

export function RoleCheckboxes<T extends string>({
    roles,
    selected,
    onChange,
    name,
    className = '',
}: {
    roles: T[];
    selected: T[];
    onChange: (roles: T[]) => void;
    name: string;
    className?: string;
}) {
    const toggleRole = (role: T, checked: boolean) => {
        onChange(checked ? [...selected, role] : selected.filter((selectedRole) => selectedRole !== role));
    };

    return (
        <div className={`checkbox-grid ${className}`}>
            {roles.map((role) => (
                <Form.Check
                    key={role}
                    type="checkbox"
                    id={`${name}-${role}`}
                    label={operationTitle(role)}
                    checked={selected.includes(role)}
                    onChange={(event) => toggleRole(role, event.target.checked)}
                />
            ))}
        </div>
    );
}
