import { useEffect, useRef, useState } from "react";

export default function Textarea({
  onValChange,
  value,
  placeholder,
  className,
}: {
  onValChange: (val: string) => void;
  value: string;
  placeholder: string;
  className: string;
}) {
  const [text, setText] = useState(value);
  console.log(text)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onValChange(e.target.value);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(()=>{
    if(textAreaRef.current){
      console.log("textResize")
      textAreaRef.current.style.height = "0px"
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`
    } 
  },[text])

  useEffect(()=>{
    setText(value)
  },[value])

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
