import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/ui/button';

const ALLOWED_IMAGE_TYPES = ['jpeg', 'png', 'webp'];

interface Props {
    onChange: (f: File[]) => void;
}
export function InputFile({ onChange }: Props) {
    const [imageNames, setImageNames] = useState<string[] | undefined>();
    const [error, setError] = useState<string | undefined>();

    const onDrop = (acceptedFiles: File[]) => {
        onChange(acceptedFiles);
        setImageNames(acceptedFiles.map((file) => file.name));
    };

    const onError = (e: Error) => {
        console.log(e);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onDropRejected = (fileRejections: FileRejection[], _event: DropEvent) => {
        if (fileRejections.length > 1) {
            setError('Max 1 image file is allowed. Try again.');
        } else if (
            !fileRejections.every((fileRejection) => {
                const ext = fileRejection.file.name.split('.').pop()?.toLowerCase();
                if (ext) {
                    return ALLOWED_IMAGE_TYPES.includes(ext);
                } else {
                    return false;
                }
            })
        ) {
            console.log('hola');
            setError(`The following image types are allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}.`);
        } else {
            setError('An unexpected error has occured. Please try again.');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected,
        onError,
        maxFiles: 1,
        maxSize: 1e7,
        multiple: false,
        accept: Object.fromEntries(ALLOWED_IMAGE_TYPES.map((type) => [`image/${type}`, []])),
    });

    useEffect(() => {
        if (error) {
            setTimeout(() => setError(undefined), 10000);
        }
    }, [error]);
    return (
        <div>
            <Label>Product Image</Label>
            <div {...getRootProps()}>
                <Input {...getInputProps()} />
                <div className="text-center border my-2 py-8 rounded-md cursor-pointer text-[0.8rem] text-muted-foreground">
                    {imageNames && imageNames.length > 0 ? (
                        imageNames.map((imageName, i) => <p key={i}>{imageName}</p>)
                    ) : (
                        <p>Drag and drop a picture, or click to select</p>
                    )}
                </div>
            </div>
            {imageNames && imageNames.length > 0 && (
                <Button variant="outline" size="sm" className="float-right" onClick={() => onChange([])} type="button">
                    Clear
                </Button>
            )}
            {error && <Alert destructive title="Error" description={error} />}
        </div>
    );
}
