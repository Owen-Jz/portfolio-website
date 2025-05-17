import React from "react";

const SocialSidebar = () => {
  const socials = [
    // {
    //   name: "GitHub",
    //   url: "https://github.com/OwenJz",
    //   icon: "https://cdn.simpleicons.org/github/fff",
    // },
    {
      name: "Twitter/X",
      url: "https://x.com/owendigitals",
      icon: "https://cdn.simpleicons.org/x/fff",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/owen_thecreator",
      icon: "https://cdn.simpleicons.org/instagram/fff",
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@0wen_thecreator",
      icon: "https://cdn.simpleicons.org/tiktok/fff",
    },
    {
      name: "Behance",
      url: "https://behance.net/owendigitals",
      icon: "https://cdn.simpleicons.org/behance/fff",
    },
    {
      name: "Whatsapp",
      url: "https://wa.me/2349164713975",
      icon: "https://cdn.simpleicons.org/whatsapp/fff",
    },
  ];

  return (
    <div
      className="fixed z-50 md:right-2 md:top-1/2 md:-translate-y-1/2 bottom-0 left-0 right-0 flex md:flex-col flex-row justify-center border border-red-500 items-center gap-4 md:gap-2 p-3 md:p-2  backdrop-blur-md rounded-t-[12px] md:rounded-[12px] w-full md:w-12"
      style={{
        clipPath: "polygon(5% 10%, 95% 10%, 100% 100%, 0% 100%)",
        WebkitClipPath: "polygon(5% 10%, 95% 10%, 100% 100%, 0% 100%)",
      }}
    >
      {socials.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-7 h-7 md:w-8 md:h-8 transition-transform duration-200 hover:scale-110"
        >
          <img
            src={icon}
            alt={`${name} logo`}
            className="w-[18px] h-[18px] md:w-5 md:h-5 group-hover:filter"
            style={{
              filter: "grayscale(100%) brightness(1.5)",
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
