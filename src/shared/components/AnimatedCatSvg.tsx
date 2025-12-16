import React from "react";
import "./AnimatedCatSvg.css";

interface AnimatedCatSvgProps {
  isSearching: boolean;
}

const AnimatedCatSvg: React.FC<AnimatedCatSvgProps> = ({ isSearching }) => {
  return (
    <div className={`cat-3d-container ${isSearching ? "searching" : ""}`}>
      <div className="cat-3d-scene">
        <div className="cat-body-3d">
          <div className="cat-body-main"></div>
          <div className="cat-body-highlight"></div>
        </div>

        <div className="cat-head-3d">
          <div className="cat-head-main"></div>
          <div className="cat-head-highlight"></div>

          <div className="cat-ear cat-ear-left">
            <div className="cat-ear-inner"></div>
          </div>
          <div className="cat-ear cat-ear-right">
            <div className="cat-ear-inner"></div>
          </div>

          <div className={`cat-eyes ${isSearching ? "looking" : ""}`}>
            <div className="cat-eye cat-eye-left">
              <div className="cat-pupil"></div>
              <div className="cat-eye-shine"></div>
              <div className="cat-eye-shine-secondary"></div>
            </div>
            <div className="cat-eye cat-eye-right">
              <div className="cat-pupil"></div>
              <div className="cat-eye-shine"></div>
              <div className="cat-eye-shine-secondary"></div>
            </div>
          </div>

          <div className="cat-nose"></div>

          <div className={`cat-whiskers ${isSearching ? "active" : ""}`}>
            <div className="whisker whisker-left-1"></div>
            <div className="whisker whisker-left-2"></div>
            <div className="whisker whisker-right-1"></div>
            <div className="whisker whisker-right-2"></div>
          </div>
        </div>

        <div className={`cat-tail-3d ${isSearching ? "wagging" : ""}`}>
          <div className="tail-segment tail-base"></div>
          <div className="tail-segment tail-mid"></div>
          <div className="tail-segment tail-tip"></div>
        </div>

        <div className="cat-paws">
          <div className="paw paw-left"></div>
          <div className="paw paw-center"></div>
          <div className="paw paw-right"></div>
        </div>

        {isSearching && (
          <div className="cat-hearts">
            <div className="heart heart-1">💕</div>
            <div className="heart heart-2">💖</div>
            <div className="heart heart-3">💗</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCatSvg;
