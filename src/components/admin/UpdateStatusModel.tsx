import { AppDialog } from "./AppDialog";

interface UpdateStatusModelProps {
    isOpen: boolean;
    onClose: () => void;
    initialStatus: string;
    message: string;
    onSubmit: (status: string) => void;
    loading?: boolean;
}

const UpdateStatusModel = ({
    isOpen,
    onClose,
    initialStatus,
    message,
    onSubmit,
    loading = false,
}: UpdateStatusModelProps) => {
    const updateStatus = initialStatus === "active" ? "inactive" : "active";

    const handleSubmit = () => {
        onSubmit(updateStatus);
    };

    return (
        <AppDialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            title="Update Banner Status"
        >
            <div className="p-6 space-y-6">

                {/* Icon + Message */}
                <div className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <svg
                            className="h-8 w-8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    {/* Content */}
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Confirm Status Change
                        </h2>

                        <p className="text-base leading-relaxed text-gray-600">
                            {message}
                            <span className={`mx-1 mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-lg capitalize font-medium
                                ${initialStatus === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}>
                                {initialStatus}
                            </span>
                            <span className="mx-2">to</span>
                            <span
                                className={`mx-1 mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-lg capitalize font-medium ${updateStatus === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {updateStatus}
                            </span>
                            .
                        </p>
                    </div>
                </div>


                {/* Footer Actions */}
                <div className="grid grid-cols-2 gap-3 border-t pt-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/80 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Confirm Update"}
                    </button>
                </div>

            </div>
        </AppDialog>
    );
};

export default UpdateStatusModel;
