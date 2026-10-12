import Image from "next/image";

type Props = { className?: string };

export function BrandMark({ className }: Props) {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={463}
      height={461}
      priority
      className={`object-contain ${className ?? ""}`}
    />
  );
}
