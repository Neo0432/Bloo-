"use client";

import Image from "next/image";
import "./AuthorizationPage.css";
import { useEffect, useState } from "react";
import IsValidData from "../components/isValidData";

function serializeForm(formNode) {
  return new FormData(formNode);
}
async function createNewAccountFetch(data) {
  const dataJson = JSON.stringify({
    username: data.get("username"),
    password: data.get("password"),
    email: data.get("email"),
  });
  try {
    console.log(data);
    return await fetch(
      "http://localhost:5137/login/new-account/create-account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dataJson,
      }
    );
  } catch (e) {
    console.log(e);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const serializedFormData = serializeForm(event.target);
  const response = await createNewAccountFetch(serializedFormData);
  const data = await response.json();
  console.log(data);
}

async function checkForUsernameEmpty(username) {
  const data = JSON.stringify({
    username: username,
  });
  console.log(data);

  try {
    return await fetch(
      "http://localhost:5137/login/new-account/is-username-empty",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }
    );
  } catch (e) {
    console.log(e);
  }
}

// function IsMailValid(mailAdress) {
//   useEffect(() => {
//     setIsMailValid(EMAIL_REGEXP.test(isMailValid));
//   }, [isMailValid]);

//   return isMailValid;
// }

export default function Authorization() {
  const [nickname, setNickname] = useState("");
  const [debouncedNickname, setDebouncedNickname] = useState("");
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);

  const handleChange = (event) => {
    setNickname(event.target.value);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedNickname(nickname);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [nickname]);

  useEffect(() => {
    async function fetchData() {
      if (debouncedNickname) {
        console.log(`Отправка запроса для ${debouncedNickname}`);
        const response = await checkForUsernameEmpty(debouncedNickname);
        const data = await response.json();
        if (data) setIsUsernameEmpty(data.data.isUsernameEmpty);
        // console.log(data.data.isUsernameEmpty);
      } else setIsUsernameEmpty(false);
    }
    fetchData();
  }, [debouncedNickname]);

  const [mail, setMail] = useState("");
  const [debouncedMail, setDebouncedMail] = useState("");
  const [isMailValid, setIsMailValid] = useState(false);

  const handleChangeMail = (event) => {
    setMail(event.target.value);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedMail(mail);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [mail]);

  useEffect(() => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (debouncedMail) {
      setIsMailValid(EMAIL_REGEXP.test(debouncedMail));
    } else setIsMailValid(false);
  }, [debouncedMail]);

  const [password, setPassword] = useState("");
  const [debouncedPassword, setDebouncedPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedPassword(password);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [password]);

  useEffect(() => {
    const PASSWORD_REGEXP =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (debouncedPassword)
      setIsPasswordValid(PASSWORD_REGEXP.test(debouncedPassword));
    else setIsPasswordValid(false);
  }, [debouncedPassword]);

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
                  value={nickname}
                  onChange={handleChange}
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active focus:drop-shadow-link-shadow formInput"
                />
                <label
                  htmlFor="userName"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3 cursor-text"
                >
                  Nickname
                </label>
                <IsValidData isValid={isUsernameEmpty} />
              </section>
              <section className="relative">
                <input
                  type="email"
                  id="userEmail"
                  name="email"
                  placeholder=" "
                  autoComplete="off"
                  value={mail}
                  onChange={handleChangeMail}
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active focus:drop-shadow-link-shadow formInput"
                />
                <label
                  htmlFor="userEmail"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3 cursor-text"
                >
                  E-mail
                </label>
                <IsValidData isValid={isMailValid} />
              </section>
              <section className="relative">
                <input
                  type="text"
                  id="userPass"
                  name="password"
                  placeholder=" "
                  autoComplete="off"
                  value={password}
                  onChange={handleChangePassword}
                  className="flex w-full h-12 px-4 border-second-orange border-[3px] rounded-xl bg-transparent outline-none focus:border-second-orange-active focus:drop-shadow-link-shadow formInput"
                />
                <label
                  htmlFor="userPass"
                  className="absolute bg-[#212121] px-2 top-[calc(50%-0.7rem)] left-3 cursor-text"
                >
                  Password
                </label>
                <IsValidData isValid={isPasswordValid} />
              </section>

              <button
                type="submit"
                id="formSubmit"
                disabled={!(isUsernameEmpty && isMailValid && isPasswordValid)}
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
