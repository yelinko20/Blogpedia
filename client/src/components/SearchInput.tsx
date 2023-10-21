import { FormEvent } from "react";

import { setQuery } from "@/redux/slice/search-post-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Icons } from "@/icons/icons";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  handleSubmit(e: FormEvent<HTMLFormElement>): Promise<undefined | null>;
  className?: { block: string; width: string };
};

export default function SearchInput({
  handleSubmit,
  className,
}: SearchInputProps) {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.query);
  return (
    <form onSubmit={handleSubmit} className="">
      <fieldset
        className={cn(
          "w-full rounded-full pr-4 space-y-1 dark:text-gray-100 border border-input bg-background hover:border-foreground hover:border-2 hidden sm:block",
          className?.block
        )}
      >
        <label htmlFor="Search" className="hidden">
          Search
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="button"
              title="search"
              className="p-1 focus:outline-none focus:ring inline-block"
            >
              <Icons.search
                style={{ width: 20, height: 20 }}
                className="text-muted-foreground"
              />
            </button>
          </span>
          <input
            type="search"
            placeholder="Search..."
            value={query!}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            className={cn(
              "sm:w-auto w-0 py-2 pl-10 text-sm rounded-md  focus:outline-none  dark:text-gray-100 bg-transparent lg:w-96 caret-muted-foreground",
              className?.width
            )}
          />
        </div>
      </fieldset>
    </form>
  );
}
