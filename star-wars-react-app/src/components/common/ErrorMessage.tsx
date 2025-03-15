interface ErrorMessageProps {
    message: string;
  }
  
  export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="bg-red-900 text-white p-4 rounded-md text-center">
        <p>{message}</p>
      </div>
    );
  }