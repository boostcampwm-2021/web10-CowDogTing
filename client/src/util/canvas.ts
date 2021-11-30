/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import { RefObject } from "react";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const PIXEL = 32;
const CIRCLE_WIDTH = CANVAS_WIDTH / 2;
const CIRCLE_HEIGHT = CANVAS_HEIGHT - PIXEL;
const RADIUS = 85;

const LEFT_CHARACTER_LEFT_MOVE = 10;
const LEFT_CHARACTER_RIGHT_MOVE = 11;
const CHARACTER_LEFT_DANCE = 14;
const CHARACTER_RIGHT_DANCE = 15;
const RIGHT_CHARACTER_LEFT_MOVE = 4;
const RIGHT_CHARACTER_RIGHT_MOVE = 5;
const MAX_WORKER = 65; // CANVAS_WIDTH / 2 (400) - IMAGE_SIZE_UP * PIXEL = 336 // 1000 / 15 = 66 // 336 / 66 = 5.xxx
const IMAGE_SIZE_UP = 2;

export function drawImage(ref: RefObject<HTMLCanvasElement>) {
  if (!ref.current) return;
  const ctx: CanvasRenderingContext2D = ref.current.getContext("2d")!;

  ctx.strokeStyle = "#ffcfcf";
  ctx.lineWidth = 1;
  ctx.lineWidth = 5.0;

  ctx.beginPath();
  ctx.moveTo(CIRCLE_WIDTH, CIRCLE_HEIGHT / 2); // 중앙에서 시작
  ctx.arc(CIRCLE_WIDTH - RADIUS, CIRCLE_HEIGHT / 2, RADIUS, 0, Math.PI, true);
  ctx.moveTo(CIRCLE_WIDTH, CIRCLE_HEIGHT / 2); // 중앙으로 이동
  ctx.arc(CIRCLE_WIDTH + RADIUS, CIRCLE_HEIGHT / 2, RADIUS, Math.PI, 2 * Math.PI);
  ctx.moveTo(CIRCLE_WIDTH - 2 * RADIUS, CIRCLE_HEIGHT / 2); // 하단 원 그리기 이동
  ctx.arc(CIRCLE_WIDTH, CIRCLE_HEIGHT / 2, 2 * RADIUS, Math.PI, (Math.PI * 4) / 6, true);
  ctx.lineTo(CIRCLE_WIDTH, CIRCLE_HEIGHT);
  ctx.moveTo(CIRCLE_WIDTH + 2 * RADIUS, CIRCLE_HEIGHT / 2); // 하단 원 그리기 이동
  ctx.arc(CIRCLE_WIDTH, CIRCLE_HEIGHT / 2, 2 * RADIUS, 0, Math.PI / 3);
  ctx.lineTo(CIRCLE_WIDTH, CIRCLE_HEIGHT);
  ctx.stroke();
}

export function moveCharacter(image1: HTMLImageElement, image2: HTMLImageElement, ref: RefObject<HTMLCanvasElement>, work: number) {
  if (!ref.current) return;
  const ctx: CanvasRenderingContext2D = ref.current.getContext("2d")!;

  const LEFT_WORK = checkWorkType("Left", work);
  const RIGHT_WORK = checkWorkType("Right", work);

  const distance = isWorkCompare(work) ? work * 5 : MAX_WORKER * 5;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  image1.onload = (): void => {
    ctx.drawImage(image1, PIXEL * LEFT_WORK, 0, PIXEL, PIXEL, distance, CANVAS_HEIGHT / 2, IMAGE_SIZE_UP * PIXEL, IMAGE_SIZE_UP * PIXEL);
  };

  image2.onload = (): void => {
    ctx.drawImage(image2, PIXEL * RIGHT_WORK, 0, PIXEL, PIXEL, CANVAS_WIDTH - IMAGE_SIZE_UP * PIXEL - distance, CANVAS_HEIGHT / 2, IMAGE_SIZE_UP * PIXEL, IMAGE_SIZE_UP * PIXEL);
  };
}

function checkWorkType(type: string, work: number) {
  if (isWorkStop(work)) return 0;
  if (type === "Left") return isWorkCompare(work) ? (isEvenNum(work) ? LEFT_CHARACTER_LEFT_MOVE : LEFT_CHARACTER_RIGHT_MOVE) : isEvenNum(work) ? CHARACTER_LEFT_DANCE : CHARACTER_RIGHT_DANCE;
  return isWorkCompare(work) ? (isEvenNum(work) ? RIGHT_CHARACTER_LEFT_MOVE : RIGHT_CHARACTER_RIGHT_MOVE) : isEvenNum(work) ? CHARACTER_LEFT_DANCE : CHARACTER_RIGHT_DANCE;
}

function isEvenNum(num: number) {
  return num % 2 === 0;
}

function isWorkStop(num: number) {
  const currentTenNum = Math.floor(num / 10);
  const stopTenNum = Math.floor(MAX_WORKER / 10);
  const difNum = currentTenNum - stopTenNum;
  return num >= MAX_WORKER && difNum < 4;
}

function isWorkCompare(num: number) {
  return num < MAX_WORKER;
}
