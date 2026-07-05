'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type CircleArrowUpProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    circle: {},
    group: {
      initial: {
        y: 0,
      },
      animate: {
        y: [0, '15%', '-35%', 0],
        transition: {
          ease: 'easeInOut',
          duration: 0.7,
        },
      },
    },
    path1: {},
    path2: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: CircleArrowUpProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        variants={variants.circle}
        initial="initial"
        animate={controls}
      />
      <motion.g variants={variants.group} initial="initial" animate={controls}>
        <motion.path
          d="m16 12-4-4-4 4"
          variants={variants.path1}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M12 16V8"
          variants={variants.path2}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function CircleArrowUp(props: CircleArrowUpProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  CircleArrowUp,
  CircleArrowUp as CircleArrowUpIcon,
  type CircleArrowUpProps,
  type CircleArrowUpProps as CircleArrowUpIconProps,
};
