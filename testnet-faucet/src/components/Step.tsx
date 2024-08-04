export const Step = ({ step }: { step: number }) => (
    <div className="border border-[--dark-blue] rounded-full h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center mb-4">
        <p className="font-semibold">{step}</p>
    </div>
);
