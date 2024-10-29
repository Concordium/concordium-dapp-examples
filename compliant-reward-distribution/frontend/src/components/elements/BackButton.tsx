"use client";

import { ArrowLeft } from "lucide-react"; // Ensure you have lucide-react installed
import { useNavigate } from 'react-router-dom';
import React from "react";
import { Button } from "react-bootstrap";

interface BackButtonProps {
    redirectURL: string;
}

const BackButton: React.FC<BackButtonProps> = ({ redirectURL }) => {

    const navigate = useNavigate();

    return (
        <Button
        onClick={(e)=>{
            navigate(redirectURL)
        }}
            variant="light"
            className="d-flex align-items-center mb-4 mt-2"
            style={{
                borderRadius: "8px",
                background: "rgba(212, 214, 220, 0.2)", // Background color with 20% opacity
                color: "#808080", 
                padding: "8px 12px", // Smaller padding for a compact button
                maxWidth: "54px", // Set a maximum width for the button
                left: '20px', // Align the button to the left with some margin
            }}
        >
            <ArrowLeft size={20} color="#D4D6DC" /> {/* Left arrow icon */}
        </Button>
    );
}

export default BackButton;
