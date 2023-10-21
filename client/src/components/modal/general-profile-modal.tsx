import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProfileModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export default function GeneralProfileModal({
  children,
  title,
  onClose,
  isOpen,
}: ProfileModalProps) {
  function onOpenChange(isOpen: boolean) {
    !isOpen && onClose();
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
