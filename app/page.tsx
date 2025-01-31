"use client";
import AddPerson from "@/components/controls/AddPerson";
import Board from "@/components/controls/Board";
import AddItems from "@/components/controls/AddItems";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useGlobals } from "@/contexts/GlobalContext";
import AddImage from "@/components/controls/AddImage";
import BoardUtilities from "@/components/controls/BoardUtilities";
import EditPersons from "@/components/controls/EditPersons";
import Celebrities from "@/components/controls/Celebrities";
import { ItemType } from "@/misc/enums";
import AddPokemon from "@/components/controls/AddPokemon";
import { BsImage } from "react-icons/bs";
import { cn } from "@/misc/utils";
import AdsenseUnit from "@/components/google-ads/AdsenseUnit";

export default function Home() {
  const { selectedScreen, setSelectedScreen } = useGlobals();

  // Define the screens inside the component
  const screens = {
    "Add Person": <AddPerson key="add-person" />,
    "Edit Persons": <EditPersons key="edit-persons" />,
    Celebrities: <Celebrities key="celebrities" category="Celebrities" />,
    Fictional: <Celebrities key="fictional" category="Fictional" />,
    Objects: <AddItems type={ItemType.OBJECT} key="add-items-object" />,
    Buildings: <AddItems type={ItemType.BUILDING} key="add-items-building" />,
    Animals: <AddItems type={ItemType.ANIMAL} key="add-items-animal" />,
    Pokemon: <AddPokemon key="add-items-pokemon" />,
    Image: <AddImage key="add-image" />,
  };

  return (
    <main className="p-2.5 space-y-2.5 flex flex-col items-stretch">
      <Header />
      <NavBar className="hidden lg:flex z-[9999]" />
      <div className="flex flex-col lg:flex-row gap-2.5  h-fit lg:min-h-screen relative z-10">
        <div className="w-full h-full lg:max-w-[400px] bg-white rounded-2xl shadow-sm p-4 border border-gray-200 overflow-y-auto">
          {screens[selectedScreen as keyof typeof screens]}
        </div>
        <div className="flex flex-col flex-grow gap-2 order-first lg:order-none">
          <BoardUtilities />
          <Board />
          <span
            onClick={() => setSelectedScreen("Image")}
            className={`flex md:hidden w-full justify-center items-center gap-2 max-h-[50px] py-4 px-6 h-full !mt-0 border-b border-transparent bg-white rounded-2xl shadow-sm border border-gray-200 transition-all duration-300 cursor-pointer hover:text-primary hover:border-primary/40 ${cn(
              selectedScreen === "Image" && "!text-primary !border-primary"
            )}`}
          >
            <BsImage />
            <span className="text-xs text-center"> Add Image</span>
          </span>
          <NavBar className="lg:hidden" />
        </div>
      </div>
      <div className="flex">
        <div className="w-full md:min-w-[400px] md:max-w-[400px]">
          <AdsenseUnit slot="7985047243" format="auto" responsive={true} />
        </div>
        <main className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold text-gray-800">
                Heightcomparisonchart.com
              </span>{" "}
              has a straightforward tool for quickly measuring your height
              compared to your partner, children, and pet. You can visualize the
              exact dimensions of your body here without going through hundreds
              of applications or wasting time searching for the best height
              comparison website.
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-6 mb-4">
              How to Use Height Comparison Chart
            </h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              The tool is designed for all users, ensuring inclusivity and ease
              of use. It provides measurement results in both centimeters (cm)
              and feet (in), making it flexible for everyone. This chart helps
              visualize the height difference accurately between individuals or
              objects.
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              You can measure heights up to 10,000 meters (32,808.4 feet),
              making it suitable for comparing even monumental structures like
              Mount Everest, Burj Khalifa, and the Eiffel Tower.
            </p>
            <ol className="list-decimal list-inside text-gray-800 leading-relaxed space-y-2">
              <li>
                Decide whom you want to compare your height with—whether
                it&apos;s a person, animal, or object. Enter their details
                (gender, height in cm or in). Then, press the{" "}
                <span className="font-semibold">&quot;Add&quot; button.</span>
              </li>
              <li>
                To compare with predefined objects, just input the person&apos;s
                details; object heights are already in our database.
              </li>
              <li>
                View the results on a visual chart. The tool automatically
                converts between cm and feet as required.
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Why Compare Your Height On This Chart
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Unlike average visualizers, this tool provides precise, real-world
              height comparisons with human avatars. Use it to compare heights
              with friends, family, or celebrities, making it a fun topic for
              small talk.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Kid’s Growth
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This tool is perfect for tracking children’s growth over time. You
              can easily determine how your child measures up to their peers of
              the same age, making it an essential tool for parents and
              educators.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Other Benefits
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Explore our extensive celebrity database, including heights of BTS
              members, tallest U.S. presidents, actors, athletes, and more.
              Compare yourself with your favorite stars and discover the
              difference.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Additionally, compare heights with fictional characters like
              Batman, Pokémon, Spider-Man, and even animals like giraffes,
              dinosaurs, and bears.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Compare Multiple Heights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Planning a wedding or event? Use our chart to compare heights of
              multiple groomsmen or bridesmaids simultaneously. Visualize how
              you and your group will appear together.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The side-by-side comparisons are easy to interpret. Print your
              results and display them for fun or planning purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              How Accurate Is It?
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This simulator ensures precise height comparisons. The visual
              chart provides exact measurements, like comparing heights of 5’2
              and 5’7 with realistic depictions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our goal is to provide accurate height measurements and a seamless
              user experience. Visualize your height against anyone worldwide
              using our advanced mapping features, ensuring a fun and insightful
              comparison experience.
            </p>
          </section>
        </main>
      </div>
    </main>
  );
}
