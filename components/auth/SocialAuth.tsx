import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

type Props = {
    btnText: string;
  
};

const SocialAuth = ({btnText, ...props}: Props) => {
  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full rounded-full font-semibold"
    >
      <FcGoogle />
      {btnText}
    </Button>
  );
};

export default SocialAuth;
