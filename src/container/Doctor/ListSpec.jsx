import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import request from "../../components/config/Index";
import Loading from "../../assets/Animation/loading.json";
import Lottie from "lottie-react";

function ListSpec() {
  const [listSpec, setListSpec] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getList = async () => {
    setIsLoading(true);
    try {
      const res = await request.get("/categories");
      setListSpec(res?.data?.data?.categories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(listSpec);

  return (
    <div>
      <div className="flex justify-center items-center bg-[#013040] pt-[130px] gap-2 pb-[20px]">
        <input
          type="text"
          placeholder="Search Doctors"
          className="px-3 py-2 rounded-[10px] border-[#0E91A5] border-2 bg-white outline-none"
        />
        <select className="bg-[white] px-3 py-2 rounded-[10px] outline-none border-2 border-[#0E91A5] text-[#084d58] font-semibold">
          <option value="1">Tashkent</option>
          <option value="2">Namangan</option>
          <option value="3">Andijon</option>
          <option value="4">Samarqand</option>
        </select>
        <button className="p-2.5 rounded-[10px] bg-[#0d91a6] text-white text-[20px]">
          <BiSearch />
        </button>
      </div>

      <div className="bg-[#F5F5F5] py-10">
        <Container>
          <div className="bg-white p-10 rounded-2xl">
            <h1 className="text-[24px] font-bold mb-[10px]">Doctors</h1>

            {isLoading ? (
              <div className="flex justify-center items-center">
                <Lottie
                  animationData={Loading}
                  loop
                  autoplay
                  className="h-[30%] w-[30%]"
                />
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {listSpec.map((category) => (
                  <div
                    key={category._id}
                    className="break-inside-avoid bg-[#0d91a6]/10 p-4 rounded-[10px]"
                  >
                    <h2 className="text-[18px] font-semibold text-[#084d58]">
                      <Link
                        to={`/listDoc/${category._id}?name=${encodeURIComponent(
                          category.name,
                        )}`}
                      >
                        {category.name}
                      </Link>
                    </h2>

                    {category.description && (
                      <p className="text-sm text-neutral-600 mt-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ListSpec;
