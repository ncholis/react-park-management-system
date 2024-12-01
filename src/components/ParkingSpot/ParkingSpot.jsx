import { Text, Rect } from "react-konva";
import React from "react";
import PropTypes from "prop-types";

const ParkingSpot = ({ spot, onSpotClick, animationTriggered }) => {
  return (
    <>
      <React.Fragment>
        <Rect
          x={spot.x}
          y={spot.y}
          width={75}
          height={75}
          cornerRadius={90}
          fill={spot.isAvailable ? "green" : "orange"}
          onTap={() => {
            onSpotClick(spot);
          }}
          onClick={() => {
            onSpotClick(spot);
          }}
        />
        <Text
          x={spot.x + 10}
          y={spot.y + 15}
          text={
            spot.isAvailable
              ? `P${spot.id} \nTersedia`
              : `P(${spot.id}) \nTerisi`
          }
          fontSize={19}
          fontFamily="Calibri"
          fill="white"
          onTap={() => {
            onSpotClick(spot);
          }}
          onClick={() => {
            onSpotClick(spot);
          }}
        />
        {/* Animation pop icon when status changes */}
        {animationTriggered === spot && (
          <Text
            x={spot.x + 80}
            y={spot.y + 35}
            text={spot.isAvailable ? "🚗" : "🚘"}
            fontSize={30}
            fontFamily="Calibri"
            fill="yellow"
            opacity={0.8}
            scaleX={1.5}
            scaleY={1.5}
            offsetX={50}
            offsetY={50}
          />
        )}
      </React.Fragment>
    </>
  );
};

ParkingSpot.propTypes = {
  spot: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired,
  }).isRequired,
  onSpotClick: PropTypes.func.isRequired,
  animationTriggered: PropTypes.object,
};

export default ParkingSpot;
