import {
  FlexColStart,
  FlexRowCenter,
  FlexRowStartCenter,
} from "@/components/Flex";
import Button from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const supportedOAuthProviders = [
  {
    name: "google",
    available: true,
  },
  {
    name: "github",
    available: false,
  },
];

// get the type from supportedOAuthProviders
type AuthType = (typeof supportedOAuthProviders)[number]["name"];

function OAuth() {
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState<
    { name: string; loading: boolean }[]
  >([]);
  const errorParams = useSearchParams().get("error");

  React.useEffect(() => {
    if (errorParams) {
      if (errorParams === "OAuthAccountNotLinked") {
        toast.error("Email already exists, not linked with Google.");
      }
    }
  }, [errorParams]);

  async function handleAuth(type: AuthType) {
    if (type === "google") {
      // set loading
      setLoading((prev) => [...prev, { name: type, loading: true }]);
      // sign in
      await signIn("google");
      // remove loading
      setLoading((prev) => prev.filter((d) => d.name !== type));
    }
    if (type === "github") {
      await signIn("github");
    }
  }

  return (
    <FlexColStart className="w-full dark:bg-transparent ">
      {/* <FlexRowCenter className="w-full grid grid-cols-3">
        <span className="p-[.5px] w-full bg-white-400/30"></span>
        <span className="text-white-400 w-full text-center text-[12px] font-ppReg">
          Continue with
        </span>
        <span className="p-[.5px] w-full bg-white-400/30"></span>
      </FlexRowCenter>
      <br /> */}
      <FlexColStart className="w-full">
        {supportedOAuthProviders.map((p, i) => (
          <Button
            key={i}
            className="w-full px-8 py-3 rounded-md bg-white-100 dark:bg-dark-102/70 hover:bg-white-100/70 border-solid border-[1px] border-white-400/40 dark:hover:bg-dark-102/70 dark:bg-dark-102 disabled:opacity-[.5] disabled:cursor-not-allowed "
            disabled={!p.available}
            onClick={handleAuth.bind(null, p.name)}
            isLoading={loading.find((d) => d.name === p.name)?.loading}
            spinnerColor={theme === "dark" ? "#fff" : "#000"}
          >
            <FlexRowCenter className="gap-5">
              {renderSocialIcon(p.name)}
              <span className="text-sm text-dark-300 dark:text-white-300 font-ppReg">
                Continue with{" "}
                {p.name.slice(0, 1).toUpperCase() + p.name.slice(1)}
              </span>
            </FlexRowCenter>
          </Button>
        ))}
      </FlexColStart>
    </FlexColStart>
  );
}

export default OAuth;

function renderSocialIcon(type: AuthType) {
  let icon = null;
  const iconWidth = 20;
  const iconHeight = 20;

  if (type === "google") {
    icon = (
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#fff"
          d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
        />
        <path
          fill="#e33629"
          d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
        />
        <path
          fill="#f8bd00"
          d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
        />
        <path
          fill="#587dbd"
          d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
        />
        <path
          fill="#319f43"
          d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4"
        />
      </svg>
    );
  }
  if (type === "github") {
    icon = (
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
        className="dark:fill-white-100 fill-dark-100"
      >
        <g>
          <path
            fillRule="evenodd"
            d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
            clipRule="evenodd"
          />
          <path d="M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0" />
        </g>
      </svg>
    );
  }
  return icon;
}
