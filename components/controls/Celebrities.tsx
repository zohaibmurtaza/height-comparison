import { useGlobals } from "@/contexts/GlobalContext";
import Message from "../ui/Message";
import FilterCelebrities from "../FilterCelebrities";
import { MAX_AVATARS } from "@/misc/data";
import AdsenseUnit from "../google-ads/AdsenseUnit";

const Celebrities = ({
  category,
}: {
  category: "Celebrities" | "Fictional";
}) => {
  const { avatars } = useGlobals();
  return (
    <div className="w-full min-h-full space-y-6">
      <FilterCelebrities category={category} />

      {avatars.length >= MAX_AVATARS && (
        <Message variant="error">
          Max {MAX_AVATARS} people at a time. Remove one to add another.
        </Message>
      )}
      <AdsenseUnit slot="7985047243" format="auto" responsive={true} />
    </div>
  );
};

export default Celebrities;
