import Abc from "./ABC";

import { getRandomWords } from "@/components/utils/getRandomWords";

import { words } from "@/sources/words";
const AbcPage = () => {
  const randomWords = getRandomWords([...words], 5);
  return <Abc randomWords={randomWords} />;
};

export const dynamic = "force-dynamic";
export default AbcPage;
