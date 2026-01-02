import { Switch } from "@/components/ui/switch";

interface StatusToggleProps {
    status: string;
    onToggle: () => void;
}

export function StatusToggle({ status, onToggle }: StatusToggleProps) {
    const isActive = status === "active";

    return (
        <div className="flex justify-center items-center gap-2">
            <span
                className={`px-2 py-1 w-[75px] text-center rounded-full text-sm font-medium capitalize
          ${isActive
                        ? "bg-success/10 text-success"
                        : "bg-red-100 text-red-700"
                    }`}
            >
                {status}
            </span>

            <Switch
                checked={isActive}
                onCheckedChange={onToggle}
                className="
          data-[state=checked]:bg-success
          data-[state=unchecked]:bg-red-500
        "
            />
        </div>
    );
}
