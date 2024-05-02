import { useEffect, useRef, useState } from "react";

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
  // console.log(text);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onValChange != null) onValChange(e.target.value);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // console.log("textResize");
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [text]);

  useEffect(()=>{
    const handleWindowResize = ()=>{
      if (textAreaRef.current) {
        // console.log("textResize");
        textAreaRef.current.style.height = "0px";
        const scrollHeight = textAreaRef.current.scrollHeight;
        textAreaRef.current.style.height = `${scrollHeight}px`;
      }
    }
    window.addEventListener("resize",handleWindowResize);
    return ()=>{
      window.removeEventListener("resize", handleWindowResize);
    }
  },[])

  useEffect(() => {
    setText(value);
  }, [value]);

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
