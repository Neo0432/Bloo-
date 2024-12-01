'use client';

import Image from 'next/image';
import './AuthorizationPage.css';
import AuthForm from './AuthForm';
// function IsMailValid(mailAdress) {
//   useEffect(() => {
//     setIsMailValid(EMAIL_REGEXP.test(isMailValid));
//   }, [isMailValid]);

//   return isMailValid;
// }

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
            <AuthForm />
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
