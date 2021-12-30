import React from "react";
import "./Loading.css";
export default function Loading() {
  return (
    <>
      <div className="container d-flex justify-content-center pt-5">
        <div className="row">
          <div className="col">
            <div class="loading"></div>
          </div>
        </div>
      </div>
    </>
  );
}
