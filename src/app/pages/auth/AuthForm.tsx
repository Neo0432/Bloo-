/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { checkForUsernameEmpty } from '@/app/api/auth/postUserAuthData';
import { createNewAccount } from './createNewAccountFetch';
import IsValidData from '../../components/isValidData';

function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const response = createNewAccount(event.target as HTMLFormElement);
  console.log(response);
}

export default function AuthForm() {
  const [isUsernameFieldEmpty, setIsUsernameFieldEmpty] = useState(false);
  const [isMailValid, setIsMailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  return (
    <form
      id="loginForm"
      action=""
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-4 w-[18.4rem]"
    >
      <NicknameInput
        isUsernameFieldEmpty={isUsernameFieldEmpty}
        setIsUsernameFieldEmpty={setIsUsernameFieldEmpty}
      />
      <MailInput isMailValid={isMailValid} setIsMailValid={setIsMailValid} />
      <PasswordInput
        isPasswordValid={isPasswordValid}
        setIsPasswordValid={setIsPasswordValid}
      />

      <button
        type="submit"
        id="formSubmit"
        className="w-44 h-12 mt-2 bg-second-orange rounded-xl font-semibold hover:bg-second-orange-active hover:drop-shadow-link-shadow hover:scale-105 active:bg-second-orange active:scale-100 transition-all duration-300"
      >
        Create account
      </button>
    </form>
  );
}

export function NicknameInput(props: {
  isUsernameFieldEmpty: boolean;
  setIsUsernameFieldEmpty: Dispatch<SetStateAction<boolean>>;
}) {
  const { isUsernameFieldEmpty, setIsUsernameFieldEmpty } = props;
  const [nickname, setNickname] = useState('');
  const [debouncedNickname, setDebouncedNickname] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        if (response) setIsUsernameFieldEmpty(response.data.isUsernameEmpty);
      } else setIsUsernameFieldEmpty(false);
    }
    fetchData();
  }, [debouncedNickname]);

  return (
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
      <IsValidData isValid={isUsernameFieldEmpty} />
    </section>
  );
}

export function MailInput(props: {
  isMailValid: boolean;
  setIsMailValid: Dispatch<SetStateAction<boolean>>;
}) {
  const { isMailValid, setIsMailValid } = props;
  const [mail, setMail] = useState('');
  const [debouncedMail, setDebouncedMail] = useState('');
  const handleChangeMail = (event: ChangeEvent<HTMLInputElement>) => {
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

  return (
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
  );
}

export function PasswordInput(props: {
  isPasswordValid: boolean;
  setIsPasswordValid: Dispatch<SetStateAction<boolean>>;
}) {
  const { isPasswordValid, setIsPasswordValid } = props;
  const [password, setPassword] = useState('');
  const [debouncedPassword, setDebouncedPassword] = useState('');

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
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
  );
}
