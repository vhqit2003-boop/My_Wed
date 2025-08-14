"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function LangButton({ current="vi" }){
  const router = useRouter();
  const params = useSearchParams();
  const toggle = () => {
    const next = current === "vi" ? "en" : "vi";
    const qp = new URLSearchParams(params.toString());
    qp.set("lang", next);
    router.push("/?"+qp.toString());
  };
  return <button onClick={toggle} className="btn-outline text-sm">{current.toUpperCase()}</button>;
}
