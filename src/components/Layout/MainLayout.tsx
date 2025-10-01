import { PropsWithChildren } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";

export default (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <>
      <main className="container-fluid h-100">{children}</main>
    </>
  );
};
