import React from "react";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import '../../styles/Submission.scss';
import backgroundImage from "/images/Slide 16_9 - 13.svg";
import linkImage from "/images/link.svg";

export default function Submission() {
  return (
    <div className="submission-container">
      <img
        src={backgroundImage}
        alt="background image"
        className="submission-background"
      />
      <div className="submission-content text-center">
        <h1 className="text-white display-4 font-weight-medium mb-4">
          You're <br /> awesome!
        </h1>
        <p className="text-white mb-6">
          We will check your submission and send the reward straight to your
          wallet. In the meantime, stay updated with the latest from Concordium on X.
        </p>
        <Button onClick={(e)=>{
          window.open("https://x.com/concordiumnet", "_blank")
        }} className="submission-button">
          Concordium on X <img src={linkImage} className="-rotate-180 ml-2" />
        </Button>
      </div>
    </div>
  );
}
