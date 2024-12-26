import {
  AnimationData,
  AnimationSpaceEnum,
  EasingEnum,
  OutOfRangeEnum,
  Keyframe,
} from "@rendley/sdk";
import { quarticInOut, remap } from "./utils";

export const DOWNSCALE_INTRO_TEXT_ANIMATION: AnimationData = {
  name: "DOWNSCALE_INTRO_TEXT_ANIMATION",
  outOutOfRange: OutOfRangeEnum.NONE,
  propertyAnimations: [
    {
      property: "scaleX",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 1.45,
          easing: EasingEnum.SinusoidalOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
    {
      property: "scaleY",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 1.45,
          easing: EasingEnum.SinusoidalOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 1,

          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
  ],
};

export const ICON_POPUP_ANIMATION: AnimationData = {
  name: "ICON_POPUP_ANIMATION",
  outOutOfRange: OutOfRangeEnum.NONE,
  propertyAnimations: [
    {
      property: "rotation",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: -Math.PI * 2,
          easing: EasingEnum.QuadraticOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 0,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
    {
      property: "scaleX",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 0.001,
          easing: EasingEnum.QuadraticOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
    {
      property: "scaleY",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 0.001,
          easing: EasingEnum.QuadraticOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
  ],
};

export const COUNTING_INTRO_TEXTS_ANIMATION: AnimationData = {
  name: "COUNTING_INTRO_TEXTS_ANIMATION",
  outOutOfRange: OutOfRangeEnum.EXTEND,
  propertyAnimations: [
    {
      property: "text",
      keyframes: [
        {
          time: 0,
          value: "coffee cups",
        },
        {
          time: 0.6,
          value: "crying sessions",
        },
        {
          time: 1.22,
          value: "issues opened",
        },
        {
          time: 1.458,
          value: "pull requests",
        },
        {
          time: 1.666,
          value: "bugs",
        },
        {
          time: 1.875,
          value: "commits",
        },
        {
          time: 2.25,
          value: "commits",
        },
      ],
    },
  ],
};

export const ROTATE_PROFILE_PICTURE_ANIMATION: AnimationData = {
  name: "ROTATE_PROFILE_PICTURE_ANIMATION",
  propertyAnimations: [
    {
      property: "rotation",
      keyframes: [
        {
          easing: EasingEnum.SinusoidalOut,
          time: 0,
          value: -6.28319,
        },
        {
          easing: EasingEnum.SinusoidalOut,
          time: 0.1,
          value: 0,
        },
      ],
    },
    {
      property: "positionX",
      keyframes: [
        {
          easing: EasingEnum.SinusoidalOut,
          time: 0,
          value: -244,
        },
        {
          easing: EasingEnum.SinusoidalOut,
          time: 0.1,
          value: 244.52288929402158,
        },
      ],
    },
  ],
};

export const FADE_IN_ANIMATION: AnimationData = {
  name: "FADE_IN_ANIMATION",
  inOutOfRange: OutOfRangeEnum.EXTEND,
  outOutOfRange: OutOfRangeEnum.NONE,
  propertyAnimations: [
    {
      property: "alpha",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.NONE,
      keyframes: [
        {
          time: 0,
          value: 1,
          easing: EasingEnum.LinearInOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 0,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
  ],
};

export const FADE_OUT_ANIMATION: AnimationData = {
  name: "FADE_OUT_ANIMATION",
  inOutOfRange: OutOfRangeEnum.EXTEND,
  outOutOfRange: OutOfRangeEnum.EXTEND,
  propertyAnimations: [
    {
      property: "alpha",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 0,
          easing: EasingEnum.LinearInOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
  ],
};

export const HAND_ANIMATION: AnimationData = {
  name: "HAND_ANIMATION",
  inOutOfRange: OutOfRangeEnum.EXTEND,
  outOutOfRange: OutOfRangeEnum.EXTEND,
  propertyAnimations: [
    {
      property: "scaleX",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 0.001,
          easing: EasingEnum.BackOut,
          space: AnimationSpaceEnum.ABSOLUTE, // The scale is multiplicative anyway, so doing RELATIVE_MULTIPLICATIVE will do outValue * originalScale * originalScale...
        },
        {
          time: 0.2,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        // Got to destination, hold
        {
          time: 0.5,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        // ClicK
        {
          time: 0.55,
          value: 0.5,
          space: AnimationSpaceEnum.ABSOLUTE,
          easing: EasingEnum.QuarticOut,
        },
        {
          time: 0.7,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
    {
      property: "scaleY",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 0.001,
          easing: EasingEnum.BackOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 0.2,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        // Got to destination, hold
        {
          time: 0.5,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        // ClicK
        {
          time: 0.55,
          value: 0.5,
          space: AnimationSpaceEnum.ABSOLUTE,
          easing: EasingEnum.QuarticOut,
        },
        {
          time: 0.7,
          value: 1,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
    {
      property: "positionY",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 0,
          easing: EasingEnum.LinearInOut,
          space: AnimationSpaceEnum.RELATIVE_ADDITIVE,
        },
        {
          time: 0.3,
          value: -300,
          easing: EasingEnum.LinearInOut,
          space: AnimationSpaceEnum.RELATIVE_ADDITIVE,
        },
        {
          time: 1,
          value: -300,
          easing: EasingEnum.LinearInOut,
          space: AnimationSpaceEnum.RELATIVE_ADDITIVE,
        },
      ],
    },
  ],
};

export const getCountUpAnimation = (
  commitsCount: number,
  positionY: number,
  duration: number
): AnimationData => {
  const keyframes: Keyframe[] = [];

  const timeDivider = remap(commitsCount, 0, 20, 6, 2);
  const lastKeyframeTime = duration / timeDivider;

  if (commitsCount > 0) {
    for (let i = 0; i <= commitsCount; i++) {
      const interpolation = quarticInOut(i / commitsCount);

      keyframes.push({
        time: ((i / commitsCount) * duration) / timeDivider,
        value: `${Math.floor(interpolation * commitsCount)}`,
      });
    }
  } else {
    keyframes.push({
      time: 0,
      value: "0",
    });
  }

  keyframes.push({
    time: duration,
    value: `${commitsCount}`,
  });

  return {
    name: "COUNT_COMMITS_ANIMATION",
    outOutOfRange: OutOfRangeEnum.NONE,
    propertyAnimations: [
      {
        property: "text",
        keyframes: keyframes,
      },
      {
        property: "positionY",
        keyframes: [
          {
            time: 0,
            value: -100,
            easing: EasingEnum.SinusoidalOut,
          },
          {
            time: lastKeyframeTime,
            value: positionY,
          },
        ],
      },
    ],
  };
};

export const PRODUCTIVE_DAY_ANIMATION: AnimationData = {
  name: "PRODUCTIVE_DAY_ANIMATION",
  outOutOfRange: OutOfRangeEnum.NONE,
  propertyAnimations: [
    {
      property: "positionY",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 1100,
          easing: EasingEnum.QuarticOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 0.5,
          value: 846.3416747343936,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
  ],
};

export const ROTATE_STAR_ANIMATION: AnimationData = {
  name: "ROTATE_STAR_ANIMATION",
  outOutOfRange: OutOfRangeEnum.NONE,
  propertyAnimations: [
    {
      property: "rotation",
      inOutOfRange: OutOfRangeEnum.EXTEND,
      outOutOfRange: OutOfRangeEnum.EXTEND,
      keyframes: [
        {
          time: 0,
          value: 6.28319,
          easing: EasingEnum.QuarticOut,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
        {
          time: 1,
          value: 0,
          space: AnimationSpaceEnum.ABSOLUTE,
        },
      ],
    },
  ],
};

export const getScrollingTextsAnimation = (
  texts: string[],
  initialPositionY: number
) => {
  const positionYKeyframes: Keyframe[] = [];
  const contentKeyframes: Keyframe[] = [];

  const textDuration = 10 / texts.length;
  const fastStayDuration = 0.66 * textDuration;
  const fastTransitionDuration = 0.33 * textDuration;

  for (let i = 0; i < texts.length; i++) {
    const isLast = i === texts.length - 1;
    const startTime = i * textDuration;

    contentKeyframes.push({
      time: startTime,
      value: texts[i],
    });

    positionYKeyframes.push(
      {
        time: startTime,
        value: initialPositionY + 200, // Starts above the center
        easing: EasingEnum.QuinticOut,
      },
      {
        time: startTime + fastTransitionDuration,
        value: initialPositionY, // Moves to the center
        easing: EasingEnum.QuinticIn,
      },
      {
        time: startTime + fastTransitionDuration + fastStayDuration,
        value: isLast ? initialPositionY : initialPositionY - 200, // Moves below the center
      }
    );
  }

  contentKeyframes.push({
    time: 20,
    value: texts[texts.length - 1],
  });

  positionYKeyframes.push({
    time: 20,
    value: initialPositionY,
  });

  return {
    name: "SCROLLING_TEXTS_ANIMATION",
    outOutOfRange: OutOfRangeEnum.EXTEND,
    propertyAnimations: [
      {
        property: "positionY",
        outOutOfRange: OutOfRangeEnum.EXTEND,
        keyframes: positionYKeyframes,
      },
      {
        property: "text",
        outOutOfRange: OutOfRangeEnum.EXTEND,
        keyframes: contentKeyframes,
      },
    ],
  };
};
