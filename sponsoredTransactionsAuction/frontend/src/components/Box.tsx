import React, { PropsWithChildren } from 'react';

type BoxProps = PropsWithChildren<{
    header: string;
}>;

/**
 * A component that creates a box with a header and background/borderLine styling.
 */
export default function Box(props: BoxProps) {
    const { children, header } = props;

    return (
        <fieldset className="box">
            <legend>{header}</legend>
            <div className="boxFields">{children}</div>
            <br />
        </fieldset>
    );
}
