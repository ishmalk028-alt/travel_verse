/**
 * app.js – Application entry point
 * Initializes the planner stepper and shared header behavior
 */
import { STEP_META } from './utils/constants.js';
import { getCurrentStep } from './utils/helpers.js';

/**
 * Render the progress stepper
 */
export function renderStepper(currentStep, container) {
  if (!container) return;

  let html = '<div class="stepper">';
  STEP_META.forEach((meta, i) => {
    const step  = meta.step;
    const isDone    = step < currentStep;
    const isActive  = step === currentStep;
    const stepClass = isDone    ? 'stepper__step--completed'
                    : isActive  ? 'stepper__step--active'
                    : '';
    const circleContent = isDone ? '✓' : step;

    html += `
      <div class="stepper__item">
        <div class="stepper__step ${stepClass}" data-step="${step}" title="${meta.label}">
          <div class="stepper__circle">${circleContent}</div>
          <span class="stepper__label">${meta.label}</span>
        </div>
        ${i < STEP_META.length - 1
          ? `<div class="stepper__connector ${isDone ? 'stepper__connector--completed' : ''}"></div>`
          : ''}
      </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

/**
 * Set up site header nav toggle for mobile
 */
export function initHeader() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('site-nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('is-open'));
}

/**
 * Auto-init on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();

  const stepperEl = document.getElementById('stepper');
  const step = getCurrentStep();
  if (stepperEl && step > 0) {
    renderStepper(step, stepperEl);
  }
});
