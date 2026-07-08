import type { ReactNode } from 'react';
import { Button, Spinner } from 'react-bootstrap';

export function SubmitButton({
    disabled,
    loading,
    isSubmitting,
    children,
}: {
    disabled?: boolean;
    loading?: boolean;
    isSubmitting?: boolean;
    children: ReactNode;
}) {
    const busy = (loading ?? false) || (isSubmitting ?? false);

    return (
        <Button type="submit" disabled={(disabled ?? false) || busy}>
            {busy && <Spinner animation="border" size="sm" className="me-2" />}
            {isSubmitting ? 'Validating' : children}
        </Button>
    );
}
