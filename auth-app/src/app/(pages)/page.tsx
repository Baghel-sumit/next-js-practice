"use client"

import AppContext from "@/context/appContext";
import { useContext } from "react";

const Home = () => {
  const userData = useContext(AppContext);

  console.log(userData);

  return (
    <div>
      Hello world
    </div>
  )
}

export default Home;
