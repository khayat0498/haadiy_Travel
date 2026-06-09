import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export function SafarLogo({ className, priority }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="Safar — Travel & Adventure"
      width={1280}
      height={700}
      priority={priority}
      className={className}
    />
  );
}
