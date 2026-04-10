import React from "react";
import Container from "../../components/Container";
import Marquee from "react-fast-marquee";

const reviews = [
  {
    name: "Dr. Mira Thomson",
    stars: 5,
    rating: "Rated 5.0 on ClinicHub",
    image: "/portrait/img1.jpeg",
    sourceIcon: "/icons/clinichub.png",
  },
  {
    name: "Dr. Sarah K.",
    stars: 5,
    rating: "Rated 4.9 on ClinicHub",
    image: "/portrait/img2.jpg",
    sourceIcon: "/icons/clinichub.png",
  },
  {
    name: "Dr. John Doe",
    stars: 5,
    rating: "Rated 5.0 on HealthPlus",
    image: "/portrait/img9.jpeg",
    sourceIcon: "/icons/healthplus.png",
  },
  {
    name: "Dr. Kim Jin",
    stars: 5,
    rating: "Rated 5.0 on MedAdvisor",
    image: "/portrait/img8.jpeg",
    sourceIcon: "/icons/medadvisor.png",
  },
  {
    name: "Dr. Mike Miller",
    stars: 5,
    rating: "Rated 4.9 on MedAdvisor",
    image: "/portrait/img5.jpeg",
    sourceIcon: "/icons/medadvisor.png",
  },
  {
    name: "Dr. Deepika Sharma",
    stars: 5,
    rating: "Rated 5.0 on ClinicTrust",
    image: "/portrait/img6.jpeg",
    sourceIcon: "/icons/clinictrust.png",
  },
];

const StarRating = ({ stars }) => (
  <div className="flex items-center">
    {Array.from({ length: stars }).map((_, idx) => (
      <svg
        key={idx}
        xmlns="http://www.w3.org/2000/svg"
        fill="#0E91A5"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        className="mr-0.5"
      >
        <path d="M12 .587l3.668 7.568L24 9.423l-6 5.854L19.336 24 12 19.897 4.664 24 6 15.277 0 9.423l8.332-1.268z" />
      </svg>
    ))}
  </div>
);

const DoctorCard = ({ name, stars, rating, image }) => (
  <div className="bg-white rounded-xl p-4 shadow-md flex justify-start gap-2 m-2">
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-full object-cover border-3 shadow-md shadow-[#0E91A5] border-[#0E91A5]"
    />
    <div>
      <h4 className="font-semibold text-sm">{name}</h4>
      <StarRating stars={stars} />
      <p className="text-xs text-gray-500 text-center">{rating}</p>
    </div>
    {/* <img src={sourceIcon} alt="source" className="w-5 h-5 mt-1" /> */}
  </div>
);

function ReviewSection() {
  return (
    <div className="bg-[#F5F5F5]">
      <Container>
        <div className="pt-[96px] text-center flex flex-col items-center justify-center  pb-[64px]">
          <h1 className="text-[#0E91A5] text-[16px] font-semibold border-b-2 border-[#0E91A5] max-w-fit">
            Review
          </h1>

          <h1 className="text-[40px] font-semibold max-w-[768px] ">
            Our Most Recommended Doctors
          </h1>
          <p className="text-[16px] font-normal max-w-[768px] text-gray-600 mt-[10px]">
            These doctors have earned top ratings from satisfied patients for
            delivering fast, friendly, and professional care through AIDoctor.
          </p>
        </div>
        <div className=" flex flex-col gap-2">
          <Marquee gradient={false} speed={40} pauseOnHover>
            {reviews.map((review, index) => (
              <DoctorCard key={index} {...review} />
            ))}
          </Marquee>
          <Marquee gradient={false} speed={40} pauseOnHover direction="right">
            {reviews.map((review, index) => (
              <DoctorCard key={index} {...review} />
            ))}
          </Marquee>
          <Marquee gradient={false} speed={40} pauseOnHover>
            {reviews.map((review, index) => (
              <DoctorCard key={index} {...review} />
            ))}
          </Marquee>
        </div>
      </Container>
    </div>
  );
}

export default ReviewSection;
