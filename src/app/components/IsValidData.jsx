"use client";

import Image from "next/image";

export default function IsValidData({ isValid }) {
  if (isValid) {
    return (
      <Image
        src="/icons/check_fill.svg"
        alt=""
        width={24}
        height={24}
        className="absolute mx-4 my-3 top-0 right-0"
      />
    );
  } else {
    return (
      <Image
        src="/icons/check_fill_false.svg"
        alt=""
        width={24}
        height={24}
        className="absolute mx-4 my-3 top-0 right-0"
      />
    );
  }
}
