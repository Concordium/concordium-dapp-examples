import type { ReactNode } from 'react';
import { useState } from 'react';

export function Section({
    title,
    children,
    collapsible = false,
    defaultExpanded = true,
    className = '',
}: {
    title: string;
    children: ReactNode;
    collapsible?: boolean;
    defaultExpanded?: boolean;
    className?: string;
}) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const sectionClassName = ['locks-section', collapsible ? 'locks-accordion-section' : '', className]
        .filter(Boolean)
        .join(' ');

    return (
        <section className={sectionClassName}>
            <div className="locks-section-header">
                <h2>{title}</h2>
                {collapsible && (
                    <button
                        type="button"
                        className="accordion-toggle"
                        aria-expanded={expanded}
                        aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
                        onClick={() => setExpanded((current) => !current)}
                    >
                        {expanded ? '∧' : '∨'}
                    </button>
                )}
            </div>
            {(!collapsible || expanded) && <div className="locks-section-body">{children}</div>}
        </section>
    );
}
