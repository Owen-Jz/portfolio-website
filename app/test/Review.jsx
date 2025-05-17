'use client';

import Image from 'next/image';

const ReviewCard = ({ testimonial }) => {
  return (
    <div className="w-[293px] h-[358px] relative bg-transparent">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="293"
        height="358"
        viewBox="0 0 293 358"
        fill="none"
      >
        <path
          d="M293 343C293 351.284 286.284 358 278 358H178C169.716 358 163 351.284 163 343V313C163 304.716 156.284 298 148 298H15C6.71573 298 0 291.284 0 283V15C0 6.71573 6.71573 0 15 0H278C286.284 0 293 6.71573 293 15V343Z"
          fill="#1E1E1E"
        />
      </svg>
      <div className="absolute left-[36px] top-[53px] inline-flex flex-col justify-start items-start gap-[18px]">
        <div className="w-[29.99px] h-[22.99px] text-white text-4xl font-bold">“</div>
        <div className="w-[222px] text-white text-[15px] font-normal font-['Manrope']">
          {testimonial.quote}
        </div>
      </div>
      <div className="absolute left-[6px] top-[311px] inline-flex justify-center items-start gap-3.5">
        <Image
          src={testimonial.picture}
          alt={testimonial.name}
          width={34}
          height={34}
          className="w-[33.51px] h-[34px] rounded-full"
        />
        <div className="inline-flex flex-col justify-start items-start gap-[7px]">
          <div className="inline-flex justify-start items-center gap-[7px]">
            <div className="text-white text-xs font-bold ">
              {testimonial.name}
            </div>
            <Image
              src={testimonial.nationality}
              alt="Nationality flag"
              width={20}
              height={10}
              className="w-5 h-2.5"
            />
          </div>
          <div className="text-white text-[10px] font-normal ">
            {testimonial.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;