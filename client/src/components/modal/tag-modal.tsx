import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TagModalProps = {
  tags: string[];
  handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
  handleInputTagChange(e: React.ChangeEvent<HTMLInputElement>): void;
  inputValue: string;
  handleRemoveTag(removedTag: string): void;
  isSubmitting: boolean;
  closeModal: () => void;
};

export default function TagModal({
  tags,
  handleInputTagChange,
  handleKeyDown,
  inputValue,
  handleRemoveTag,
  isSubmitting,
  closeModal,
}: TagModalProps) {
  return (
    <>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-sm gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span className="text-sm">{tag}</span>
              <X size={15} onClick={() => handleRemoveTag(tag)} />
            </div>
          ))}
        </div>
      )}
      <Input
        type="text"
        placeholder={"Enter your tags"}
        onKeyDown={handleKeyDown}
        onChange={handleInputTagChange}
        value={inputValue}
        className=""
      />
      <div className="mt-4 flex items-center justify-between">
        <Button size="sm" type="button" onClick={closeModal}>
          Cancel
        </Button>
        <Button disabled={isSubmitting} type="submit">
          Published
        </Button>
      </div>
    </>
  );
}
