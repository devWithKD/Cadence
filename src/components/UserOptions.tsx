import { useCallback, useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa6";
import Button from "./Button";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "../store/auth-context";
import { auth } from "../utils/firebase/firebase";
import { User, deleteUser, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Modal, { ModalRef } from "./Modal";
import IconButton from "./IconButton";
import { GrClose } from "react-icons/gr";
import { deleteUserFirestore } from "../utils/firebase/user";

export default function UserOptions() {
  const [visibility, setVisibility] = useState<boolean>(false);
  const clickableRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const name = currentUser?.displayName?.split(" ");
  let initials;
  if (name) initials = `${name[0].slice(0, 1)}${name[1].slice(0, 1)}`;
  const navigate = useNavigate();
  const modalRef = useRef<ModalRef>(null);

  const logOut = useCallback(async () => {
    await signOut(auth);
    navigate("/auth");
  }, [navigate]);

  const deleteAccount = useCallback(async () => {
    await deleteUserFirestore(currentUser?.uid as string);
    await deleteUser(currentUser as User);
    navigate("/auth");
  }, [currentUser, navigate]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        clickableRef.current &&
        !clickableRef.current.contains(e.target as Node)
      ) {
        setVisibility(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="relative" ref={clickableRef}>
      <button
        className="rounded-lg shadow bg-slate-200 dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 p-2 transition secondary-text"
        onClick={() => {
          setVisibility((state) => !state);
        }}
      >
        <FaUser />
      </button>
      {visibility && (
        <div className="absolute rounded-md min-w-fit bg-slate-200 dark:bg-slate-700 z-50 left-auto bottom-auto right-0 top-9 flex flex-col justify-center p-4 gap-2 items-center border border-slate-300 dark:border-slate-600">
          <div className="w-24 h-24 flex justify-center items-center text-3xl font-black tertiary-text rounded-full bg-slate-300 dark:bg-slate-600">
            {initials}
          </div>
          <div className="text-lg font-semibold primary-text mb-2">
            {currentUser?.displayName}
          </div>
          <Button
            title="Logout"
            Icon={CiLogout}
            size={20}
            onClick={logOut}
            className="secondary-text text-normal w-44"
          />
          <Button
            title="Delete Account"
            size={20}
            className="secondary-text text-normal w-44"
            onClick={() => {
              modalRef.current && modalRef.current.showModal();
            }}
          />
        </div>
      )}
      {createPortal(
        <Modal
          className="relative rounded-md bg-slate-200 dark:bg-slate-700"
          ref={modalRef}
        >
          <div className="absolute left-auto bottom-auto top-1.5 right-1.5">
            <IconButton
              Icon={GrClose}
              className="rounded-full secondary-text"
              onClick={() => modalRef.current?.closeModal()}
            />
          </div>
          <div className="px-8 py-10 flex flex-col gap-6 justify-center items-center primary-text">
            <div className="flex justify-center items-center flex-col gap-2">
              <p className="text-lg">
                Do you want to delete your Cadence account
              </p>
              <p className="text-xs">
                All the data created by you including boards, cards & categories
                will be deleted.
              </p>
            </div>
            <div className="flex w-full justify-around items-center">
              <Button
                title="Yes"
                className="text-normal px-4"
                onClick={deleteAccount}
              />
              <Button
                title="No"
                className="text-normal px-4"
                onClick={() => {
                  modalRef.current?.closeModal();
                }}
              />
            </div>
          </div>
        </Modal>,
        document.getElementById("modal")!
      )}
    </div>
  );
}
