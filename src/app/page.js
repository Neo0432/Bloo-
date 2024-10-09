import Image from "next/image";
import "./pages/AuthorizationPage";
import Authorization from "./pages/AuthorizationPage";
// import Router from "next/router";

// const router = new Router();

let isLoggedIn = false;

export default function Home() {
  return (
    <>
      <header></header>
      <main>
        <Authorization />
      </main>
      <footer></footer>
    </>
  );
}
