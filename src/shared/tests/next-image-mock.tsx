import type { ImgHTMLAttributes } from "react";

// next/image needs the Next.js image config at runtime. Tests only care
// about alt/src, so swap it for a plain <img>:
//   vi.mock("next/image", () => import("@/shared/tests/next-image-mock"));
export default function NextImageMock({
  alt,
  src,
}: ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} src={src} />;
}
