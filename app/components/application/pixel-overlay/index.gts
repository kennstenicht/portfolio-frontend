import { hash } from '@ember/helper';
import { service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { cached, tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import { JITTER, SWEEP_DURATION } from 'portfolio/services/pixel-overlay';
import type PixelOverlayService from 'portfolio/services/pixel-overlay';
import { getBem } from 'portfolio/utils/get-bem';

import styles from './styles.module.css';

export interface ApplicationPixelOverlaySignature {
  Element: HTMLDivElement;
}

const bem = getBem(styles);

export default class ApplicationPixelOverlay extends Component<ApplicationPixelOverlaySignature> {
  // Services
  @service declare pixelOverlay: PixelOverlayService;

  // Grid
  @tracked columns = 0;
  @tracked rows = 0;
  @tracked bounds = { left: 0, top: 0, cellSize: 1 };

  // The row count depends on the viewport's aspect ratio, so the grid is
  // measured on the client; the prerendered page ships it empty.
  measure = modifier((element: HTMLDivElement) => {
    const observer = new ResizeObserver(() => {
      const { left, top, width, height } = element.getBoundingClientRect();
      // Same breakpoint as the stylesheets' media queries.
      const columns = window.innerWidth >= 768 ? 24 : 12;
      const cellSize = width / columns;
      const rows = Math.ceil(height / cellSize);

      this.bounds = { left, top, cellSize };

      // Re-rolls the jitter, so skip resizes that keep the grid.
      if (columns !== this.columns || rows !== this.rows) {
        this.columns = columns;
        this.rows = rows;
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  });

  // Sweep
  // The origin in cells, measured between cell centres. The stylesheet
  // derives each cell's delay from its distance to it, so moving the origin
  // needs no re-render of the cells.
  get sweepStyle() {
    const { columns, rows, bounds } = this;
    const { x, y } = this.pixelOverlay.origin;
    const column = (x - bounds.left) / bounds.cellSize - 0.5;
    const row = (y - bounds.top) / bounds.cellSize - 0.5;
    // Measured to the farthest corner, so a sweep takes as long wherever it
    // starts.
    const distance =
      Math.max(
        Math.hypot(column, row),
        Math.hypot(columns - 1 - column, row),
        Math.hypot(column, rows - 1 - row),
        Math.hypot(columns - 1 - column, rows - 1 - row),
      ) || 1;

    return htmlSafe(
      [
        `--columns: ${columns}`,
        `--origin-column: ${column}`,
        `--origin-row: ${row}`,
        `--distance: ${distance}`,
        `--sweep: ${SWEEP_DURATION}ms`,
      ].join('; '),
    );
  }

  // Cached, so the jitter only re-rolls when the grid changes.
  @cached
  get cells() {
    const { columns, rows } = this;
    const cells = [];

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const jitter = Math.round(Math.random() * JITTER);

        cells.push(
          htmlSafe(`--column: ${column}; --row: ${row}; --jitter: ${jitter}ms`),
        );
      }
    }

    return cells;
  }

  // Template
  <template>
    <div
      class={{bem (hash is-covered=this.pixelOverlay.isCovered)}}
      style={{this.sweepStyle}}
      aria-hidden="true"
      data-test-pixel-overlay
      {{this.measure}}
      ...attributes
    >
      {{#each this.cells as |style|}}
        <div class={{bem "cell"}} style={{style}}></div>
      {{/each}}
    </div>
  </template>
}
