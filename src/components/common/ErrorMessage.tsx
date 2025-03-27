import '../../styles/CommonComponents.css'

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;  // Optional handler to close the error message
}

export default function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p>{message}</p>
      {onClose && (
        <button onClick={onClose}>✕</button>
      )}
    </div>
  );
}
