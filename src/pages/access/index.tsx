import { Button, Input, Link, Scaffold } from "@/components";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export default function Access() {
  const { register, handleSubmit, errors } = useForm();

  const [formData, setFormData] = useState(null);

  const onSubmit = useCallback((data) => {
    setFormData(data);
  }, []);

  return (
    <Scaffold title="Access">
      <div className="w-full h-full overflow-hidden bg-white">
        <div className="mt-8">
          <div className="w-80 mx-auto flex flex-col items-center">
            <div className="text-4xl text-center text-gray-700">NYR</div>
            <div className="text-2xl text-center text-gray-900 mb-5 mt-3 ">
              Confirm access
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-96">
              <div className="rounded-lg shadow-sm border-2 border-gray-200 bg-244-247-249 px-12 py-10">
                <div className="mb-2 text-xl font-medium">Password</div>
                <Input
                  name="password"
                  inputRef={register({ required: true })}
                />
                <Link href="#">
                  <span className="cursor-pointer select-none text-gray-500 text-sm">
                    Forget Password?
                  </span>
                </Link>
                <div className="mt-5">
                  <Button type="submit" className="w-full">
                    <span>Confirm Password</span>
                  </Button>
                </div>
              </div>
              <div className="text-center pt-3 text-gray-500">
                <span className="text-gray-600 font-medium">Tip: </span>
                <span>You are entering sudo mode.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}
