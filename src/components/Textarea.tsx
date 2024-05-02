import { useCallback, useEffect, useRef, useState } from "react";

export default function Textarea({
  onValChange,
  value,
  placeholder,
  className,
}: {
  onValChange?: (val: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}) {
  const [text, setText] = useState(value);
  const [height, setHeight] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onValChange != null) onValChange(e.target.value);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    if (textAreaRef.current) {
      // console.log(value);
      // textAreaRef.current.classList.add("h-0")
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      setHeight(Math.max(scrollHeight, 18 ));
    }
  }, []);

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.style.height = `${height}px`;
  }, [height]);

  useEffect(() => {
    resize();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      resize();
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <textarea
      className={className}
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      ref={textAreaRef}
    ></textarea>
  );
}
