import React from "react";
import { Header } from "semantic-ui-react";
import AddForm from "./AddForm";

const Add = () => {
  return (
    <>
      <Header as="h3">Add today&apos;s stats</Header>
      <p>
        Here you can register how many hours you&apos;ve used each app today
      </p>
      <AddForm />
    </>
  );
};

export default Add;
