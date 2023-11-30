"use client";
import authOptions from "@/lib/authOptions";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function Home() {
  const { data, status } = useSession();
  const session = data?.user;
  const authenticated = status === "authenticated"
  return (
    <main className="w-full h-screen flex justify-center items-center bg-foreground">
      <div className="flex flex-col justify-center items-center gap-3 p-8 rounded-2xl cursor-pointer bg-white">
        <div className="flex justify-center items-center gap-6 p-8">
          {session ? (
            <>
              <Image
                src={session?.image as string}
                height={60}
                width={60}
                alt="Avatar"
                className="rounded-full"
              />{" "}
              <div className="flex flex-col">
                <span className="font-extrabold text-xl">{session?.name}</span>
                <span className="text-md">{session?.email}</span>
              </div>
              <div
                className="bg-destructive/40 h-[40px] w-[40px] flex justify-center items-center rounded-lg"
                onClick={() => {
                  signOut();
                }}
              >
                <LogOut className="text-destructive" />
              </div>
            </>
          ) : (
            <>
              <span className="h-[60px] w-[60px] bg-primary/30 rounded-full animate-pulse">
                {" "}
              </span>
              <div className="flex flex-col gap-3">
                <span className="w-[300px] h-[15px] bg-primary/30 rounded-lg animate-pulse"></span>
                <span className="w-[250px] h-[10px] bg-primary/30 rounded-lg animate-pulse"></span>
              </div>
            </>
          )}
        </div>
        {!authenticated && (
          <div className="bg-foreground hover:bg-foreground/95 h-[50px] w-[80%] flex justify-center items-center gap-3 rounded-lg text-white" onClick={() => signIn("google")}>
            <svg
              id="Capa_1"
              height={"40px"}
              version="1.1"
              viewBox="0 0 150 150"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <style type="text/css">
                {`
          .st0{fill:#1A73E8;}
          .st1{fill:#EA4335;}
          .st2{fill:#4285F4;}
          .st3{fill:#FBBC04;}
          .st4{fill:#34A853;}
          .st5{fill:#4CAF50;}
          .st6{fill:#1E88E5;}
          .st7{fill:#E53935;}
          .st8{fill:#C62828;}
          .st9{fill:#FBC02D;}
          .st10{fill:#1565C0;}
          .st11{fill:#2E7D32;}
          .st12{fill:#F6B704;}
          .st13{fill:#E54335;}
          .st14{fill:#4280EF;}
          .st15{fill:#34A353;}
          .st16{clipPath:url(#SVGID_2_);}
          .st17{fill:#188038;}
          .st18{opacity:0.2;fill:#FFFFFF;enableBackground:new;}
          .st19{opacity:0.3;fill:#0D652D;enableBackground:new;}
          .st20{clipPath:url(#SVGID_4_);}
          .st21{opacity:0.3;fill:url(#_45_shadow_1_);enableBackground:new;}
          .st22{clipPath:url(#SVGID_6_);}
          .st23{fill:#FA7B17;}
          .st24{opacity:0.3;fill:#174EA6;enableBackground:new;}
          .st25{opacity:0.3;fill:#A50E0E;enableBackground:new;}
          .st26{opacity:0.3;fill:#E37400;enableBackground:new;}
          .st27{fill:url(#Finish_mask_1_);}
          .st28{fill:#FFFFFF;}
          .st29{fill:#0C9D58;}
          .st30{opacity:0.2;fill:#004D40;enableBackground:new;}
          .st31{opacity:0.2;fill:#3E2723;enableBackground:new;}
          .st32{fill:#FFC107;}
          .st33{opacity:0.2;fill:#1A237E;enableBackground:new;}
          .st34{opacity:0.2;}
          .st35{fill:#1A237E;}
          .st36{fill:url(#SVGID_7_);}
          .st37{fill:#FBBC05;}
          .st38{clipPath:url(#SVGID_9_);fill:#E53935;}
          .st39{clipPath:url(#SVGID_11_);fill:#FBC02D;}
          .st40{clipPath:url(#SVGID_13_);fill:#E53935;}
          .st41{clipPath:url(#SVGID_15_);fill:#FBC02D;}
        `}
              </style>
              <g>
                <path
                  className="st14"
                  d="M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5C115,101.8,120,90,120,76.1L120,76.1z"
                />
                <path
                  className="st15"
                  d="M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z"
                />
                <path
                  className="st12"
                  d="M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z"
                />
                <path
                  className="st13"
                  d="M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z"
                />
              </g>
            </svg>{" "}
            Se connecter avec google
          </div>
        )}
      </div>
    </main>
  );
}
