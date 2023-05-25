import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

const ReactProgressBar = ({ finalData , setFinalData }) => {
  

  useEffect(() => {
    const timer = setInterval(() => {
      setFinalData((prevProgress) => {
        return prevProgress.map((item) => {
          if (item.min < item.max) {
            return { ...item, min: item.min + 1 };
          }
          return item;
        });
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const calculatePercentage = (min, max) => {
    const percentage = (min / max) * 100;
    return Math.round(percentage);
  };

  return (
    <>
      <div>
        {finalData.map((item, index) => (
          <ProgressBar
            key={index}
            striped
            now={calculatePercentage(item.min, item.max)}
            label={`${calculatePercentage(item.min, item.max)}%`}
          />
        ))}
      </div>
    </>
  );
};

export default ReactProgressBar;


