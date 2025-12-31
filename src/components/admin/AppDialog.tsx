import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface AppDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export function AppDialog({
    open,
    onClose,
    title,
    children,
    maxWidth = "max-w-2xl",
}: AppDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className={`${maxWidth} w-full max-h-[90vh] overflow-y-auto`}
            >
                <DialogHeader className="w-full">
                    <DialogTitle className="w-full text-center">{title}</DialogTitle>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}
