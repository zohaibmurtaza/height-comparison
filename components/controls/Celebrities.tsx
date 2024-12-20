import { useGlobals } from "@/contexts/GlobalContext";
import Message from "../ui/Message";
import FilterCelebrities from "../FilterCelebrities";

const Celebrities = ({
  category,
}: {
  category: "Celebrities" | "Fictional";
}) => {
  const { avatars } = useGlobals();
  return (
    <div className="w-full min-h-full space-y-6">
      <FilterCelebrities category={category} />

      {avatars.length >= 10 && (
        <Message variant="error">
          Max 10 people at a time. Remove one to add another.
        </Message>
      )}
    </div>
  );
};

export default Celebrities;
