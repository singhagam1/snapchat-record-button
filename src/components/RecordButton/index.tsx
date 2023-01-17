import {Pressable, Animated, Easing, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Svg, Circle} from 'react-native-svg';

interface outerStyleProps {
  color?: string;
  strokeSize?: number;
}
interface innerStyleProps {
  strokeSize?: number;
  color?: string;
  spacing?: number;
}

interface AnimeCircleProps {
  videoCaptureStart: boolean;
  customStyles?: {
    outerStyle: outerStyleProps;
    innerStyle: innerStyleProps;
  };
  onTimeCompleted: Function;
  duration: number;
  size: number;
}

function AnimeCircle({
  videoCaptureStart,
  customStyles,
  onTimeCompleted,
  duration,
  size,
}: AnimeCircleProps) {
  const animated = React.useRef<any>(new Animated.Value(0)).current;
  const circleRef = React.useRef<any>();
  const RADIUS = size / (0.8 * Math.PI);
  const RADIUS2 = size / (1.2 * Math.PI);
  const circumference = 2 * Math.PI * RADIUS;

  const animation = () => {
    return Animated.timing(animated, {
      toValue: 100,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  React.useEffect(() => {
    if (videoCaptureStart) {
      animation();
      animated.addListener(
        (v: any) => {
          if (v.value === 100) {
            onTimeCompleted();
            return;
          }
          const strokeDashoffset =
            circumference - (circumference * v.value) / 100;
          if (circleRef?.current) {
            circleRef.current.setNativeProps({
              strokeDashoffset,
            });
          }
        },
        [videoCaptureStart],
      );
    } else {
      animated.removeAllListeners();
      animated.setValue(0);
      circleRef.current.setNativeProps({
        strokeDashoffset: circumference,
      });
    }
    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View
      style={{
        width: size,
      }}>
      <Svg preserveAspectRatio="none" width={size} height={size}>
        <Circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          fill="transparent"
          stroke={customStyles?.outerStyle.color || 'red'}
          strokeWidth={customStyles?.outerStyle.strokeSize || 5}
          strokeLinecap="round"
          strokeDashoffset={circumference}
          strokeDasharray={circumference}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          fill="transparent"
          stroke={customStyles?.outerStyle.color || 'red'}
          strokeWidth={customStyles?.outerStyle?.strokeSize || 5}
          strokeLinejoin="round"
          strokeOpacity=".1"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS2}
          fill={customStyles?.innerStyle.color || 'red'}
          strokeWidth={customStyles?.innerStyle.strokeSize || 5}
        />
      </Svg>
    </View>
  );
}

interface ProgressCircleProps {
  onVideoStart?: Function;
  onVideoStop?: Function;
  onImageClick?: Function;
  customStyles?: {
    outerStyle: outerStyleProps;
    innerStyle: innerStyleProps;
  };
  size?: number;
  duration?: number;
}
const ProgressCircle = ({
  onVideoStart = () => true,
  onVideoStop = () => true,
  onImageClick = () => true,
  customStyles,
  size = 400,
  duration = 10000,
}: ProgressCircleProps) => {
  const [videoCaptureStart, setVidepCaptureStart] = useState(false);
  const isCompleteCircle = useRef(false);

  const onTimeCompleted = () => {
    isCompleteCircle.current = true;
    saveVideo();
  };

  const saveVideo = () => {
    onVideoStop();
  };

  return (
    <Pressable
      onPress={() => onImageClick()}
      onLongPress={() => {
        isCompleteCircle.current = false;
        onVideoStart();
        setVidepCaptureStart(true);
      }}
      onPressOut={() => {
        if (videoCaptureStart) {
          if (!isCompleteCircle.current) saveVideo();
          setVidepCaptureStart(false);
        }
      }}>
      <AnimeCircle
        {...{videoCaptureStart}}
        {...{onTimeCompleted}}
        {...{duration}}
        {...{customStyles}}
        {...{size}}
      />
    </Pressable>
  );
};

export default ProgressCircle;
