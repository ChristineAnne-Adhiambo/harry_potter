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
    <div className="m-20 w-[96%]  gap-6  h-[100vh]   max-sm:grid ">
      <div className="  h-[80%] w-[80%] flex justify-center bg-slate-200 border p-10 gap-4">
        <Link
          href="/"
          className="text-white items-center justify-center bg-sky-500  h-6 w-14 "
        >
          Back
        </Link>
        {character.map((char, index) => (
          <div key={index} className=" text-black flex gap-4 ">
            <div>
              {char.image ? (
                <img
                  src={char.image}
                  alt={char.name}
                  className="h-[80%] w-80 bg-cover"
                />
              ) : (
                <div className="h-52 w-48 flex items-center justify-center bg-gray-200 text-black">
                  No Image Available
                </div>
              )}
            </div>
            <div className="text-base font-sans">
              <div>Name: {char.name}</div>
              <div>House: {char.house}</div>
              <div>
                Wand: {char.wand.wood} , {char.wand.core}
              </div>
              <div>Actor: {char.actor}</div>
              <div>ancestry: {char.ancestry}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
