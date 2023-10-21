import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/userLocalStorage";

type ProfileModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export default function Profile_Modal({
  children,
  title,
  onClose,
  isOpen,
}: ProfileModalProps) {
  const { setItem } = useLocalStorage("closeProfileModal");

  function onOpenChange(isOpen: boolean) {
    !isOpen && onClose();
    setItem(true);
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
