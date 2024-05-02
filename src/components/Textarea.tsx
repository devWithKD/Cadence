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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (onValChange != null) onValChange(e.target.value);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`
    }
  }, []);

  useEffect(() => {
    resize();
  }, [resize, text]);

  useEffect(() => {
    const handleWindowResize = () => {
      resize();
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
