import type { ReactNode } from 'react';
import { Button, Spinner } from 'react-bootstrap';

export function SubmitButton({
    disabled,
    loading,
    children,
}: {
    disabled?: boolean;
    loading?: boolean;
    children: ReactNode;
}) {
    return (
        <Button type="submit" disabled={(disabled ?? false) || (loading ?? false)}>
            {loading && <Spinner animation="border" size="sm" className="me-2" />}
            {children}
        </Button>
    );
}
