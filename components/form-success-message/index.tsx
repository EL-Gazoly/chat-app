import { CheckCircledIcon } from '@radix-ui/react-icons';

type FormSuccessMessageProps = {
    message?: string;
};

const FormSuccessMessage = ({ message }: FormSuccessMessageProps) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/15 p-3 flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircledIcon className="h-4 w-4" />
            <span>{message}</span>
        </div>
    );
};

export default FormSuccessMessage;
