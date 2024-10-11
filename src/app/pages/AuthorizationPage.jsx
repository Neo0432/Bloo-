"use client";

import Image from "next/image";
import "./AuthorizationPage.css";

function serializeForm(formNode) {
  return new FormData(formNode);
}

async function sendData(data) {
  const dataJson = JSON.stringify({
    username: "Neo",
    password: data.get("password"),
    email: data.get("email"),
  });
  try {
    console.log(data);
    return await fetch("http://localhost:5137/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Указываем JSON
      },
      body: dataJson,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function handleFormSubmit(event) {
  event.preventDefault();

  const data = serializeForm(event.target);
  const response = await sendData(data);
  console.log("Response" + response);
}

export default function Authorization() {
  return (
    <>
      <main className="font-regular h-screen px-6 py-6 bg-background-gray">
        <article className="flex items-center justify-between gap-24 w-full h-full max-w-[1440px] min-h-[740px] max-h-fit mx-auto p-6 pl-14 rounded-[1.75rem] bg-first-gray">
          <section className="flex flex-col justify-center gap-[4.5rem] min-w-80 h-fit">
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
                <a className="font-bold text-second-orange cursor-pointer hover:text-second-orange-active hover:drop-shadow-link-shadow active:text-second-orange">
                  Log in
                </a>
              </p>
            </section>
            <form
              id="loginForm"
              action=""
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-4 w-[18.4rem]"
            >
              <section className="relative w-full">
                <input
                  type="text"
                  id="userName"
                  name="username"
                  placeholder=" "
                  autoComplete="off"
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active focus:drop-shadow-link-shadow formInput"
                />
                <label
                  htmlFor="userName"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3 cursor-text"
                >
                  Nickname
                </label>
              </section>
              <section className="relative">
                <input
                  type="email"
                  id="userEmail"
                  name="email"
                  placeholder=" "
                  autoComplete="off"
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active focus:drop-shadow-link-shadow formInput"
                />
                <label
                  htmlFor="userEmail"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3 cursor-text"
                >
                  E-mail
                </label>
              </section>
              <section className="relative">
                <input
                  type="text"
                  id="userPass"
                  name="password"
                  placeholder=" "
                  autoComplete="off"
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active focus:drop-shadow-link-shadow formInput"
                />
                <label
                  htmlFor="userPass"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3 cursor-text"
                >
                  Password
                </label>
              </section>

              <button
                type="submit"
                id="formSubmit"
                className="w-44 h-12 mt-2 bg-second-orange rounded-xl font-semibold hover:bg-second-orange-active hover:drop-shadow-link-shadow hover:scale-105 active:bg-second-orange active:scale-100 transition-all duration-300"
              >
                Create account
              </button>
            </form>
          </section>
          <section className="flex relative w-full h-full max-w-[51.5rem] max-h-[43.25rem] overflow-hidden rounded-[0.875rem]">
            <Image
              src="/img/backgroundImage.jpg"
              alt="backgroundImage"
              width="824"
              height="692"
              // sizes="(max-width: 824px) 100vw, (max-width: 1200px) 66vw"
              className="absolute w-[824px] h-[692px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover object-left-bottom"
            ></Image>
          </section>
        </article>
      </main>
    </>
  );
}
