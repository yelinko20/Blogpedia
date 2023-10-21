import AutoCompleteSearchBox from "@/components/AutoCompleteSearchBox";
import SearchInput from "@/components/SearchInput";
import { useAppSelector } from "@/redux/hook";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function SmallScreenSearchPage() {
  const { query } = useAppSelector((state) => state.query);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query && query?.length > 0) {
      try {
        navigate(
          `/post/search?q=${query.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-")}`
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      return null;
    }
  }
  const className = {
    block: "block sm:hidden",
    width: "w-full",
  };
  return (
    <div className="relative">
      <SearchInput handleSubmit={handleSubmit} className={className} />
      {query && query.length > 0 && (
        <AutoCompleteSearchBox className="w-full container mx-auto sm:hidden mt-6" />
      )}
    </div>
  );
}
