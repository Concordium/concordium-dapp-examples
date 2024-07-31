interface IProps {
  errorText: string;
  onClose: () => void;
}

export const ErrorAlert = ({errorText, onClose}: IProps) => (
<div className="fixed inset-x-0 bottom-0">
  <div className="relative bg-[--red-light] mx-auto w-[90%] sm:w-3/4 max-w-md mb-10 min-h-24 max-h-40 rounded-md p-6 text-white">
    <button className="absolute top-2 right-4 text-lg" onClick={onClose}>x</button>
    <p className="text-center">
      {errorText}
    </p>
  </div>  
</div>
)