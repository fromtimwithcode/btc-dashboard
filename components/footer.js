import Link from "next/link";

export default function Footer({ systemMessage, systemColor }) {
  return (
    <div className="bg-background/80 fixed bottom-0 left-0 w-full p-2 text-xs flex justify-between items-center">
      <div className="flex items-center gap-x-1">
        <div className="flex justify-start items-center">
          <div
            className={`animate-pulse flex-none rounded-full bg-green-400/10 p-1 ${systemColor}`}
          >
            <div className="h-2 w-2 rounded-full bg-current" />
          </div>
        </div>
        <span aria-hidden="true">{systemMessage}</span>
      </div>
      <div>
        By{" "}
        <Link
          href="https://www.timbothe.dev"
          target="_blank"
          className="text-primary sm:hover:text-primary/80"
        >
          timbothe.dev
        </Link>
      </div>
    </div>
  );
}
