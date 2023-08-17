// @jsxRuntime classic
// @jsxFrag React.Fragment
// @ts-nocheck
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type params = {
  params: {
    charactersid: string;
  };
};
export default function CharacterDetail({ params: { charactersid } }: params) {
  const [character, setCharacter] = useState([]);

  // function for getting one char...
  async function fetchChar() {
    const res = await axios.get(
      `https://hp-api.onrender.com/api/character/${charactersid}`
    );
    const data = res.data;
    setCharacter(data);
  }

  useEffect(() => {
    fetchChar();
  }, []);

  return (
    <div className="mt-20 w-96  bg-neutral-100 gap-6 justify-center  grid max-sm:grid ">
      <Link
        href="/"
        className="text-white items-center justify-center bg-slate-800 h-6 w-14"
      >
        Back
      </Link>
      <div className=" items-center ">
        {character.map((char, index) => (
          <div key={index} className="  bg-neutral-100  text-black ">
            <div>Name: {char.name}</div>
            {char.image ? (
              <img
                src={char.image}
                alt={char.name}
                className="h-52 w-48 bg-cover"
              />
            ) : (
              <div className="h-52 w-48 flex items-center justify-center bg-gray-200 text-black">
                No Image Available
              </div>
            )}
            <div>House: {char.house}</div>
            <div>
              Wand: {char.wand.wood} , {char.wand.core}
            </div>
            <div>Actor: {char.actor}</div>
            <div>ancestry: {char.ancestry}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
