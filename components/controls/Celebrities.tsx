import SectionTitle from "../ui/SectionTitle";
import SearchCelebrities from "../SearchCelebrities";
import { useGlobals } from "@/contexts/GlobalContext";
import Message from "../ui/Message";
import FilterCelebrities from "../FilterCelebrities";

const Celebrities = () => {
  const { avatars } = useGlobals();
  return (
    <div className="w-full min-h-full space-y-6">
      <SectionTitle>Add Celebrities or Figures</SectionTitle>
      <SearchCelebrities />

      <div className="flex items-center gap-2">
        <hr className="w-full" />
        OR
        <hr className="w-full" />
      </div>

      <FilterCelebrities />

      {avatars.length >= 10 && (
        <Message variant="error">
          Max 12 people at a time. Remove one to add another.
        </Message>
      )}
    </div>
  );
};

export default Celebrities;
