<script>
  import { convertToUnit } from './utils'

  export let value = 0,
    size = 32,
    button = false,
    indeterminate = false,
    width = 4,
    rotate = 0

  let radius = 20

  function normalizeValue(_value) {
    if (_value < 0) {
      return 0
    }
    if (_value > 100) {
      return 100
    }
    return parseFloat(_value)
  }

  $: calculatedSize = +size + (button ? 8 : 0)
  $: circumference = 2 * Math.PI * +radius
  $: normalizedValue = normalizeValue(value)
  $: strokeDashArray = Math.round(circumference * 1000) / 1000
  $: strokeDashOffset = ((100 - normalizedValue) / 100) * circumference + 'px'
  $: viewBoxSize = radius / (1 - +width / +size)
  $: strokeWidth = (+width / +size) * viewBoxSize * 2
</script>

<div
  class="text-gray-300 progress-circular"
  class:progress-circular--indeterminate={indeterminate}
  class:progress-circular--button={button}
  style="width: {convertToUnit(calculatedSize)}; height: {convertToUnit(calculatedSize)}"
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow={indeterminate ? undefined : normalizedValue}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`${viewBoxSize} ${viewBoxSize} ${2 * viewBoxSize} ${2 * viewBoxSize}`}
    style="transform: rotate({rotate - 0});">
    {#if !indeterminate}
      <circle
        fill="transparent"
        cx={2 * viewBoxSize}
        cy={2 * viewBoxSize}
        r={radius}
        stroke-width={strokeWidth}
        stroke-dasharray={strokeDashArray}
        stroke-dashoffset="0"
        class="progress-circular__underlay" />
    {/if}
    <circle
      fill="transparent"
      cx={2 * viewBoxSize}
      cy={2 * viewBoxSize}
      r={radius}
      stroke-width={strokeWidth}
      stroke-dasharray={strokeDashArray}
      stroke-dashoffset={strokeDashOffset}
      class="progress-circular__overlay" />
  </svg>
</div>
