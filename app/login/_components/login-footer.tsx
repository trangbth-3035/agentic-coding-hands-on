import { montserratAlternates } from "../fonts";

// mms_D_Footer (Figma 662:14447): full-width bar with a top divider and a
// centered copyright line (Montserrat Alternates 700, 16/24, white).
export function LoginFooter() {
  return (
    <footer className="flex w-full items-center justify-center border-t border-[#2E3940] px-6 py-10 text-center sm:px-12 lg:px-[90px]">
      <p
        className={`${montserratAlternates.className} text-white`}
        style={{ fontSize: "16px", lineHeight: "24px" }}
      >
        Bản quyền thuộc về Sun* © 2025
      </p>
    </footer>
  );
}
