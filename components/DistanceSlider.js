import {
  Button,
  Box,
  Text,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import Disc from './icons/Disc';

const DistanceSlider = ({
  value,
  increment,
  decrement,
  setValue,
  minDistance,
  maxDistance,
}) => {
  return (
    <Flex direction="column" align="center">
      <Text
        fontSize="sm"
        fontWeight="semibold"
        color="gray.700"
        textTransform="uppercase"
      >
        Distance
      </Text>
      <Text fontSize="3xl" margin="2">
        {value}ft
      </Text>
      <Flex>
        <Button onClick={decrement}>-</Button>
        <Slider
          aria-label="slider-ex-5"
          value={value}
          onChange={(val) => setValue(val)}
          min={minDistance}
          max={maxDistance}
          mx={2}
          minW={200}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box as={Disc} />
          </SliderThumb>
        </Slider>
        <Button onClick={increment}>+</Button>
      </Flex>
    </Flex>
  );
};

export default DistanceSlider;
