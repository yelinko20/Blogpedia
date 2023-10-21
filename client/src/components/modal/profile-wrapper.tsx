import { Trash, Image } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import ErrorText from "@/components/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/icons/icons";

type ProfileWrapperProps = {
  name?: string;
  bio?: string;
  image: string | File | null | undefined;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  setImage: React.Dispatch<
    React.SetStateAction<string | File | null | undefined>
  >;
  setName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setBio: React.Dispatch<React.SetStateAction<string | undefined>>;
  register: UseFormRegister<{
    bio: string;
    name: string;
    image?: string | undefined;
  }>;
  isSubmitting: boolean;
  errors: FieldErrors<{
    bio: string;
    name: string;
    image?: string | undefined;
  }>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setItem?: (value: unknown) => void;
};

export default function ProfileWrapper({
  register,
  name,
  bio,
  image,
  setName,
  setBio,
  setImage,
  handleSubmit,
  isSubmitting,
  errors,
  setIsOpen,
  setItem,
}: ProfileWrapperProps) {
  return (
    <form onSubmit={handleSubmit}>
      {image ? (
        <div className="flex items-center gap-4  mb-10">
          <div className="w-16 h-16 overflow-hidden">
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Profile image"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <Trash
            className="text-destructive"
            size={20}
            onClick={() => setImage("")}
          />
        </div>
      ) : (
        <>
          <div className="w-16 h-16  mb-10">
            <label
              htmlFor="image"
              className="flex items-center justify-center w-16 border border-foreground h-16 rounded-full text-gray-700 font-bold text-muted-foreground"
            >
              <Image />
            </label>
          </div>
          <ErrorText>{errors.image?.message}</ErrorText>
        </>
      )}
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={(event) => setImage(event.target.files?.[0] || "")}
        className="hidden"
      />
      <div className="mb-6">
        <Input
          {...register("name")}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ErrorText>{errors.name?.message}</ErrorText>
      </div>
      <div>
        <Input
          {...register("bio")}
          type="text"
          placeholder="Bio"
          value={bio}
          id="bio"
          onChange={(e) => setBio(e.target.value)}
        />
        <ErrorText>{errors.bio?.message}</ErrorText>
      </div>
      <div className="flex justify-end gap-6 items-center mt-6">
        <Button
          variant="outline"
          type="button"
          className="select-none"
          onClick={() => {
            setIsOpen(false);
            setItem && setItem(true);
          }}
        >
          Cancel
        </Button>
        <Button className="select-none" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save
        </Button>
      </div>
    </form>
  );
}
