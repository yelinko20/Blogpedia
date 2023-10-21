import * as z from "zod";
import GeneralProfileModal from "@/components/modal/general-profile-modal";
import ProfileWrapper from "@/components/modal/profile-wrapper";
import { useUserAuth } from "@/context/UserContextProvider";
import { profileModalValidator } from "@/validators/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axiosInstance";
import { QueryKeys } from "@/constants/query-keys";
import toast from "react-hot-toast";

type FormData = {
  bio: string;
  name: string;
  image: File | null;
};

export default function EditGeneralProfile({
  isOpen,
  setIsOpen,
  setItem,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setItem?: (value: unknown) => void;
}) {
  const { user } = useUserAuth();
  const [image, setImage] = useState<File | string | null | undefined>(
    user?.profile.image || ""
  );
  const [bio, setBio] = useState<string | undefined>(user?.profile.bio);
  const [name, setName] = useState<string | undefined>(user?.name);

  type profileModalSchemaProps = z.infer<typeof profileModalValidator>;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<profileModalSchemaProps>({
    resolver: zodResolver(profileModalValidator),
  });

  const { mutate } = useMutation<void, Error, FormData>({
    mutationFn: async (formData) => {
      const formDataToSend = new FormData();
      formDataToSend.append("bio", formData.bio || "");
      formDataToSend.append("name", formData.name);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
      await axiosInstance.patch(`/api/v1/profile/${user?.id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.UpdateProfile, user?.id],
      });
      setItem && setItem(true);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GetUser] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GetUserProfile, user?.profile.username],
      });
      toast.success("Profile updated!");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: profileModalSchemaProps) => {
    if (!user) {
      return;
    }

    const formData: FormData = {
      bio: data.bio,
      name: data.name,
      image: image instanceof File ? image : null,
    };

    mutate(formData);
  };
  return (
    <>
      <GeneralProfileModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Profile information"
      >
        <ProfileWrapper
          name={name}
          setName={setName}
          bio={bio}
          image={image}
          setImage={setImage}
          setBio={setBio}
          handleSubmit={handleSubmit(onSubmit)}
          register={register}
          isSubmitting={isSubmitting}
          errors={errors}
          setIsOpen={setIsOpen}
          setItem={setItem}
        />
      </GeneralProfileModal>
    </>
  );
}
