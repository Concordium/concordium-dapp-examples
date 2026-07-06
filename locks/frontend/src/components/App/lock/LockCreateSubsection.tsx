import type { ReactNode } from 'react';

export function LockCreateSubsection({
    title,
    actions,
    children,
}: {
    title: string;
    actions?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="lock-create-subsection">
            <div className="lock-create-subsection-header">
                <h4>{title}</h4>
                {actions}
            </div>
            {children}
        </section>
    );
}
