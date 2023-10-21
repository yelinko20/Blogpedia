import { Button } from "@/components/ui/button";
import ImageUpload from "@/utils/imageUpload";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string | undefined;
  image: string;
  setImage: (image: string) => void;
}

export default function Image_Upload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  async function handleImageUpload(value: File) {
    const response = await ImageUpload(value);
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="z-10 absolute top-2 right-2">
          <Button
            type="button"
            onClick={() => onRemove(url)}
            variant="destructive"
            size="sm"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <image className="object-cover" />
      </div>
      <Button
        type="button"
        disabled={disabled}
        variant="secondary"
        onClick={() => handleImageUpload(value)}
      >
        <ImagePlus className="h-4 w-4 mr-2" />
        Upload an Image
      </Button>
    </div>
  );
}
