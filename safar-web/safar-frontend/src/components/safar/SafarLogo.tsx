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
      width={880}
      height={420}
      priority={priority}
      className={className}
    />
  );
}
