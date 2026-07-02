import type { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

export function FormCard({
    title,
    children,
    className = '',
}: {
    title: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <Card className={`locks-form-card ${className}`}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {children}
            </Card.Body>
        </Card>
    );
}
