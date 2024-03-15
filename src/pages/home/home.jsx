import React, { useRef, useState } from "react";
import { Card } from "./components/card/card";
import { Typography } from "@material-tailwind/react";
import { useGetTodos } from "./service/query/useGetTodos";
import { useCreateList } from "./service/mutation/useCreateList";
import { toast } from "react-toastify";
import { queryClient } from "../../config/query-client";

export const Home = () => {
  const { data, isLoading } = useGetTodos();
  const loadingPage = () => {
    return (
      <div className="w-full h-full animate-pulse">
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-1250 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-1250 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-1250 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-1250 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-1250 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
    );
  };
  const { mutate, isPending } = useCreateList();
  const ref = useRef(null);
  const submit = (e) => {
    e.preventDefault()
    mutate(
      {
        description: "Mr Lorem",
        title: ref.current.value,
      },
      {
        onSuccess: () => {
          toast.success("Added");
          queryClient.invalidateQueries({ queryKey: ["todolist"] });
        },
      }
    );
  };
  return (
    <div className=" pt-4">
      <form onSubmit={submit}>
        <input
          ref={ref}
          className=" bg-blue-200 border-2 border-blue-800 outline-none mr-2"
          placeholder="Title"
          type="text"
        />
        <button
          className="bg-blue-500 text-white font-bold px-2 py-1 rounded-xl"
          type="submit"
        >
          {isPending ? "Adding..." : "Add To List"}
        </button>
      </form>
      <div className="mt-5">
        {isLoading ? (
          <div>{loadingPage()}</div>
        ) : (
          <div>
            {data?.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
