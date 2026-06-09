import Image from "next/image";
import { montserrat } from "../fonts";

// mms_A_Header (Figma 662:14391): h-80, px-144 py-12, bg rgba(11,15,18,0.8),
// logo on the left, language selector on the right.
export function LoginHeader() {
  return (
    <header className="flex h-20 w-full items-center justify-between bg-[#0B0F12]/80 px-6 py-3 sm:px-12 lg:px-36">
      {/* mms_A.1_Logo */}
      {/* mm:I662:14391;178:1033;178:1030 */}
      <Image
        src="/login/Logo.png"
        alt="Sun* logo"
        width={52}
        height={48}
        priority
      />

      {/* mms_A.2_Language — VN flag + "VN" + chevron */}
      <button
        type="button"
        className="flex h-14 cursor-pointer items-center justify-between gap-0.5 rounded px-4 py-4 transition-colors duration-200 ease-out hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 motion-reduce:transition-none"
        aria-label="Change language, current: Vietnamese"
      >
        <span className="flex items-center gap-1">
          {/* mm:I662:14391;186:1696;186:1821;186:1709 */}
          <Image src="/login/VN.svg" alt="" width={24} height={24} />
          <span
            className={`${montserrat.className} text-base text-white`}
            style={{ lineHeight: "24px", letterSpacing: "0.15px" }}
          >
            VN
          </span>
        </span>
        {/* mm:I662:14391;186:1696;186:1821;186:1441 */}
        <Image src="/login/Down.svg" alt="" width={24} height={24} />
      </button>
    </header>
  );
}
