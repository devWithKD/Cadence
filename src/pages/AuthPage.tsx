import { useAuth } from "../store/auth-context";
import Button from "../components/Button";
import { Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import ThemeToggleButton from "../components/ThemeToggleButton";

export default function AuthPage() {
  const { currentUser, authWithGoogle, authWithGithub, setMode, mode } =
    useAuth();

  return (
    <>
      {currentUser || mode == "demo" ? (
        <Navigate to="/board" />
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center relative overflow-hidden primary-bg">
          <div className="w-10/12 xl:w-3/4 flex flex-col xl:flex-row gap-4 md:gap-6 justify-evenly items-center">
            <div className="w-full xl:w-4/6 flex flex-col gap-3 ">
              <h1 className="text-4xl primary-text font-semibold">Cadence</h1>
              <p className="text-2xl secondary-text font-light ps-0.5 text-pretty">
                Visualize your workflow, move tasks effortlessly between stages,
                and keep your focus laser-sharp. Stop feeling like you're
                drowning in to-dos and start taming your workload with Task
                Tamer!
              </p>
            </div>
            <div className="flex-1 flex xl:w-full flex-col md:flex-row xl:flex-col justify-center items-center gap-4 secondary-text">
              {/* <div className="flex w-full flex-col gap-4 justify-center items-center"> */}
              <Button
                Icon={FcGoogle}
                size={24}
                className="xl:min-w-full gap-4 text-nowrap text-lg font-medium drop-shadow-md ps-3"
                title="Sign In with Google"
                onClick={authWithGoogle}
              />
              <Button
                Icon={FaGithub}
                size={24}
                className="xl:min-w-full gap-4 text-nowrap text-lg font-medium drop-shadow-md ps-3"
                title="Sign In with Github"
                onClick={authWithGithub}
              />
              {/* </div> */}
              <Button
                title="Try out TaskTamer"
                onClick={() => setMode("demo")}
                className="xl:min-w-full text-nowrap text-lg font-medium drop-shadow-md"
              />
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <ThemeToggleButton />
          </div>
        </div>
      )}
    </>
  );
}
