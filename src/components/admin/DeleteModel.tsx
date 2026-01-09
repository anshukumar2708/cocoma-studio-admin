import { AppDialog } from "./AppDialog";

interface IDeleteModelProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    onSubmit: () => void;
    loading?: boolean;
}

const DeleteModel = ({
    isOpen,
    onClose,
    message,
    onSubmit,
    loading = false,
}: IDeleteModelProps) => {

    const handleSubmit = () => {
        onSubmit();
    };

    return (
        <AppDialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            title=""
        >
            <div className="p-6 space-y-6">
                {/* Header / Message */}
                <div className="flex gap-4">
                    {/* Warning Icon */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
                            />
                        </svg>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Delete Banner
                        </h2>
                        <p className="text-sm text-gray-600">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="grid grid-cols-2 gap-3 border-t pt-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete Banner"}
                    </button>
                </div>
            </div>
        </AppDialog>

    );
};

export default DeleteModel;
