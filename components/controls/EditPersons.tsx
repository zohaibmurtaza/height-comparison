import SectionTitle from "@/components/ui/SectionTitle";
import { useGlobals } from "@/contexts/GlobalContext";
import EditPersonForm from "@/components/EditPersonForm";

const EditPersons = () => {
  const { avatars } = useGlobals();
  return (
    <div className="w-full h-full space-y-2.5">
      <SectionTitle>Edit Avatar</SectionTitle>
      {avatars.map((avatar, index) => (
        <EditPersonForm key={index} avatar={avatar} />
      ))}
    </div>
  );
};

export default EditPersons;
