import Image from "next/image";
import "./AuthorizationPage.css";
// import { useEffect, useState } from "react/cjs/react.production.min";
import React, { useEffect, useState } from "react";

const [document, set_document] = useState(null);
useEffect(() => {
  set_document(document);
});
const applicantForm = document.getElementById("loginForm");
applicantForm.addEventListener("submit", handleFormSubmit);

function serializeForm(formNode) {
  return new FormData(formNode);
}

async function sendData(data) {
  return await fetch("/api/apply", {
    method: "POST",
    body: data,
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const data = serialise(event.target);
  const response = await sendData(data);
}

export default function Authorization() {
  return (
    <>
      <main className="font-regular h-screen px-6 py-6 bg-background-gray">
        <article className="flex justify-between gap-24 w-full h-full max-w-[1440px] min-h-[740px] mx-auto p-6 pl-14 rounded-[1.75rem] bg-first-gray">
          <section className="flex flex-col justify-center gap-[4.5rem] h-full">
            <section className="grid gap-6">
              <Image
                src="/logo/Bloo!.svg"
                alt="Bloo!"
                width={125}
                height={59}
              />
              <h1 className="font-medium text-5xl leading-[110%]  w-fit">
                Create <br /> your account
              </h1>
              <p className="font-medium text-2xl w-fit">
                Already have an account?&nbsp;
                <a className="font-bold text-second-orange">Log in</a>
              </p>
            </section>
            <form
              id="loginForm"
              action=""
              className="flex flex-col gap-4 w-[18.4rem]"
            >
              <section className="relative w-full">
                <input
                  type="text"
                  id="userNickname"
                  placeholder=" "
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active formInput"
                />
                <label
                  htmlFor="userNickname"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3"
                >
                  Nickname
                </label>
              </section>
              <section className="relative">
                <input
                  type="email"
                  id="userEmail"
                  placeholder=" "
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active formInput"
                />
                <label
                  htmlFor="userEmail"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3"
                >
                  E-mail
                </label>
              </section>
              <section className="relative">
                <input
                  type="text"
                  id="userPass"
                  placeholder=" "
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active formInput"
                />
                <label
                  htmlFor="userPass"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3"
                >
                  Password
                </label>
              </section>

              <button
                type="submit"
                id="formSubmit"
                className="w-44 h-12 mt-2 bg-second-orange rounded-xl font-semibold hover:bg-second-orange-active hover:scale-105 active:bg-second-orange active:scale-100 transition-all duration-300"
              >
                Create account
              </button>
            </form>
          </section>
          <section className="flex w-fit h-full overflow-hidden rounded-[0.875rem]">
            <Image
              src="/img/backgroundImage.jpg"
              alt="backgroundImage"
              width="824"
              height="692"
            ></Image>
          </section>
        </article>
      </main>
    </>
  );
}
