"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import NoImage from "./assets/No-Image-Placeholder.svg.png";
import { selectCharacters } from "./redux/slices";
export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(
    <p className="text-center text-3xl font-semibold">Just a Moment...</p>
  );
  const dispatch = useDispatch();
  const fetchItems = async () => {
    try {
      const url = `https://hp-api.onrender.com/api/characters`;
      const response = await fetch(url, {
        method: "GET",
      });
      const parseRes = await response.json();
      //add characters to redux store
      dispatch(selectCharacters(parseRes));
      setLoading(<></>);
    } catch (error: any) {
      console.log(error.message);
      setLoading(
        <>
          <p className="text-center text-red-500 text-3xl font-semibold">
            {error.message}
          </p>
          <button
            className="mt-2 w-[100px] h-[40px] flex justify-center items-center bg-black text-white rounded-lg"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </>
      );
    }
  };
  const { characters } = useSelector((state: any) => state.characterReducer);
  const filteredCharacters = characters.filter((character: any) =>
    character.name.toLowerCase().includes(query.toLowerCase())
  );
  useEffect(() => {
    fetchItems();
  }, []);
  return (
    <main className="flex min-h-screen m-10 flex-col items-center justify-between p-10">
      <input
        className=" mb-2 text-sm font-xl text-black h-12 w-[80%] rounded"
        placeholder="Type here to search character...."
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading}
      <div className="md:grid lg:grid-cols-4 gap-[30px] max-md:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
        {filteredCharacters.map((character: any) => (
          <Link href={`/characters/${character.id}`} key={character.id}>
            {character.image ? (
              <Image
                src={character.image}
                width={400}
                height={480}
                alt={character.name}
                className="h-[380px] w-full rounded-t-lg"
              />
            ) : (
              <Image
                src={NoImage}
                width={270}
                height={230}
                alt={character.name}
                className="h-[400px] w-full rounded-t-lg"
              />
            )}

            <div className="ml-6 my-2 text-lg" id={character.id}>
              <p>Name: {character.name}</p>
              <p>
                {character.dateOfBirth === null
                  ? "no DoB"
                  : character.dateOfBirth}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
